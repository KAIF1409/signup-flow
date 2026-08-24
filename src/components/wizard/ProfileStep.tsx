import { useState } from 'react'
import { Controller, useForm, useWatch, type Control } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarDays, GraduationCap, User } from 'lucide-react'
import { Button } from '../ui/Button'
import { TextField } from '../ui/TextField'
import { SelectField } from '../ui/SelectField'
import { PillGroup } from '../ui/PillGroup'
import { useWizardStore } from '../../store/useWizardStore'
import { profileFormSchema, type ProfileFormValues } from '../../lib/validation'
import { createAccount } from '../../lib/mockApi'
import { getCollegesForRegion, REGIONS } from '../../data/locations'

const PRONOUN_OPTIONS = ['He/Him', 'She/Her', 'They/Them', 'Prefer not to say']

/** College/City dropdown — options are filtered live by the selected State. */
function CollegeField({ control, error }: { control: Control<ProfileFormValues>; error?: string }) {
  const region = useWatch({ control, name: 'region' })
  const colleges = getCollegesForRegion(region ?? '')

  return (
    <Controller
      control={control}
      name="college"
      render={({ field }) => (
        <SelectField
          label="College / City"
          icon={<GraduationCap />}
          placeholder={region ? 'Select your college or city' : 'Select a state first'}
          hint={
            region
              ? `Showing ${colleges.length} options in ${region}`
              : 'Pick a state above — this list updates automatically.'
          }
          options={colleges.map((c) => ({ value: c, label: c }))}
          disabled={!region}
          error={error}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
        />
      )}
    />
  )
}

/**
 * Screen 4 · Steps 3 & 4 — Profile details & completion.
 * Cross-field logic: picking a State filters the College/City list and
 * resets any previously selected college.
 */
export function ProfileStep() {
  const goTo = useWizardStore((s) => s.goTo)
  const setDraft = useWizardStore((s) => s.setDraft)
  const authenticate = useWizardStore((s) => s.authenticate)

  const savedFullName = useWizardStore((s) => s.fullName)
  const savedAge = useWizardStore((s) => s.age)
  const savedPronouns = useWizardStore((s) => s.pronouns)
  const savedRegion = useWizardStore((s) => s.region)
  const savedCollege = useWizardStore((s) => s.college)

  const [submitting, setSubmitting] = useState(false)

  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: savedFullName,
      age: savedAge,
      pronouns: savedPronouns,
      region: savedRegion,
      college: savedCollege,
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const onSubmit = async (values: ProfileFormValues) => {
    setSubmitting(true)
    try {
      // Mock API delay before account creation.
      await createAccount()
      setDraft({
        fullName: values.fullName.trim(),
        age: values.age,
        pronouns: values.pronouns,
        region: values.region,
        college: values.college,
      })
      authenticate()
      goTo('success', 1)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex min-h-full flex-col px-6 pb-8 pt-6">
      <h1 className="text-[26px] font-extrabold uppercase leading-[1.2] tracking-tight">
        Tell us about <span className="text-gradient">you</span>
      </h1>
      <p className="mt-2 text-[13px] leading-relaxed text-white/50">
        This helps us match you with the right rooms and the right people.
      </p>

      <div className="mt-7 space-y-5">
        <Controller
          control={control}
          name="fullName"
          render={({ field }) => (
            <TextField
              label="Full name"
              icon={<User />}
              autoComplete="name"
              autoFocus
              placeholder="Neel Patel"
              error={errors.fullName?.message}
              onChange={field.onChange}
              onBlur={field.onBlur}
              value={field.value}
            />
          )}
        />

        <Controller
          control={control}
          name="age"
          render={({ field }) => (
            <TextField
              label="Age"
              icon={<CalendarDays />}
              inputMode="numeric"
              pattern="\d*"
              maxLength={3}
              placeholder="21"
              hint="You must be 18 or older to join Extroverts."
              error={errors.age?.message}
              onChange={(e) => {
                // Strip anything that is not a digit as the user types.
                field.onChange(e.currentTarget.value.replace(/\D/g, ''))
              }}
              onBlur={field.onBlur}
              value={field.value}
            />
          )}
        />

        <Controller
          control={control}
          name="pronouns"
          render={({ field }) => (
            <PillGroup
              label="Pronouns"
              options={PRONOUN_OPTIONS}
              value={field.value}
              onChange={(v) => {
                field.onChange(v)
                // Validate immediately once a pill is picked.
                void trigger('pronouns')
              }}
              error={errors.pronouns?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="region"
          render={({ field }) => (
            <SelectField
              label="State"
              placeholder="Select your state"
              options={REGIONS.map((r) => ({ value: r, label: r }))}
              error={errors.region?.message}
              value={field.value}
              onChange={(e) => {
                field.onChange(e)
                // Cross-field logic: new state invalidates the chosen college.
                setValue('college', '', { shouldValidate: false })
              }}
              onBlur={field.onBlur}
            />
          )}
        />

        <CollegeField control={control} error={errors.college?.message} />
      </div>

      <div className="mt-auto pt-8">
        <Button fullWidth type="submit" loading={submitting}>
          Complete profile
        </Button>
        <p className="mt-3 text-center text-[10px] uppercase tracking-[0.18em] text-white/25">Step 3 of 3 · Profile</p>
      </div>
    </form>
  )
}
