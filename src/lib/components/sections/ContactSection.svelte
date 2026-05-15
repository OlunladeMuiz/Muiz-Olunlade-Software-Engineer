<script lang="ts">
  import { scrollReveal } from '$lib/actions/scrollReveal';
  import { sectionObserver } from '$lib/actions/sectionObserver';
  import SectionHeading from '$lib/components/shared/SectionHeading.svelte';
  import { contactSchema, contactSubjectOptions, type ContactFormData } from '$lib/schemas/contact';
  import { toast } from '$lib/stores/toast';

  export let id = 'contact';

  function createForm(): ContactFormData {
    return {
      name: '',
      email: '',
      subject: 'job',
      message: '',
      honeypot: ''
    };
  }

  let form: ContactFormData = createForm();

  let errors: Partial<Record<keyof ContactFormData, string>> = {};
  let submitting = false;

  function validate() {
    const result = contactSchema.safeParse(form);

    errors = {};

    if (result.success) {
      return true;
    }

    const visibleIssues = result.error.issues.filter((issue) => issue.path[0] !== 'honeypot');

    if (visibleIssues.length === 0) {
      return true;
    }

    for (const issue of visibleIssues) {
      const field = issue.path[0] as keyof ContactFormData;
      errors[field] = issue.message;
    }

    return false;
  }

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (!validate()) {
      toast('Check the form fields', 'A few inputs need attention.', 'danger');
      return;
    }

    submitting = true;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        throw new Error('Contact request failed');
      }

      form = createForm();
      errors = {};
      toast('Message sent', "I'll reply within 24 hours.", 'success');
    } catch {
      toast('Something went wrong', 'Try again in a moment or email directly.', 'danger');
    } finally {
      submitting = false;
    }
  }
</script>

<section id={id} class="section-shell" use:sectionObserver={{ id }}>
  <div class="section-inner">
    <div class="reveal" use:scrollReveal>
      <SectionHeading
        eyebrow="Contact"
        title="Start a conversation, not a form submission."
        description="The form is intentionally light, but it still validates on both sides and gives immediate feedback so the interaction feels polished."
      />
    </div>

    <div class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <form class="reveal surface rounded-[2rem] p-6 sm:p-8" use:scrollReveal on:submit={handleSubmit} novalidate>
        <div class="grid gap-4 sm:grid-cols-2">
          <label class="space-y-2">
            <span class="text-sm font-medium text-[var(--text-primary)]">Name</span>
            <input
              bind:value={form.name}
              name="name"
              autocomplete="name"
              required
              class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--border-emphasis)] focus:outline-none"
              placeholder="Your name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {#if errors.name}
              <p id="name-error" class="text-sm text-rose-300">{errors.name}</p>
            {/if}
          </label>

          <label class="space-y-2">
            <span class="text-sm font-medium text-[var(--text-primary)]">Email</span>
            <input
              bind:value={form.email}
              name="email"
              type="email"
              autocomplete="email"
              required
              class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--border-emphasis)] focus:outline-none"
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {#if errors.email}
              <p id="email-error" class="text-sm text-rose-300">{errors.email}</p>
            {/if}
          </label>
        </div>

        <label class="mt-4 block space-y-2">
          <span class="text-sm font-medium text-[var(--text-primary)]">Subject</span>
          <select
            bind:value={form.subject}
            name="subject"
            required
            class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--border-emphasis)] focus:outline-none"
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
          >
            {#each contactSubjectOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
          {#if errors.subject}
            <p id="subject-error" class="text-sm text-rose-300">{errors.subject}</p>
          {/if}
        </label>

        <label class="mt-4 block space-y-2">
          <span class="text-sm font-medium text-[var(--text-primary)]">Message</span>
          <textarea
            bind:value={form.message}
            name="message"
            rows="6"
            required
            class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--border-emphasis)] focus:outline-none"
            placeholder="Tell me a bit about the project, timeline, or role."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'message-error' : undefined}
          ></textarea>
          {#if errors.message}
            <p id="message-error" class="text-sm text-rose-300">{errors.message}</p>
          {/if}
        </label>

        <div class="sr-only" aria-hidden="true">
          <label for="honeypot">Leave this field empty</label>
          <input
            id="honeypot"
            bind:value={form.honeypot}
            name="honeypot"
            tabindex="-1"
            autocomplete="off"
          />
        </div>

        <div class="mt-6 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            class="inline-flex items-center justify-center rounded-full bg-[var(--accent-primary)] px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={submitting}
          >
            {submitting ? 'Sending...' : 'Send message'}
          </button>
          <p class="text-sm text-[var(--text-tertiary)]">Usually replies within 24 hours.</p>
        </div>
      </form>

      <aside class="reveal surface rounded-[2rem] p-6 sm:p-8" use:scrollReveal>
        <h3 class="font-[var(--font-display)] text-2xl font-semibold text-[var(--text-primary)]">Let's build something sharp.</h3>
        <p class="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
          I am available for frontend or full-stack work, especially projects where clarity, performance, and visual polish matter.
        </p>

        <div class="mt-6 space-y-4">
          {#each [
            { label: 'Email', value: 'muiz.olunlade.9@gmail.com' },
            { label: 'Location', value: 'Lagos, Nigeria' },
            { label: 'Availability', value: 'Open to work' }
          ] as item}
            <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p class="text-xs uppercase tracking-[0.24em] text-[var(--text-tertiary)]">{item.label}</p>
              <p class="mt-2 text-sm font-medium text-[var(--text-primary)]">{item.value}</p>
            </div>
          {/each}
        </div>
      </aside>
    </div>
  </div>
</section>
