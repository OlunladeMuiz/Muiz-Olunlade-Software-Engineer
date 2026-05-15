<script lang="ts">
  import { skillGroups } from '$lib/data/skills';
  import { scrollReveal } from '$lib/actions/scrollReveal';
  import { sectionObserver } from '$lib/actions/sectionObserver';
  import SectionHeading from '$lib/components/shared/SectionHeading.svelte';

  export let id = 'skills';

  const featured = [
    { name: 'React / Next.js', value: 92, tone: 'bg-[var(--accent-primary)]' },
    { name: 'TypeScript', value: 88, tone: 'bg-[var(--accent-secondary)]' },
    { name: 'FastAPI / Python', value: 82, tone: 'bg-[var(--accent-success)]' },
    { name: 'PostgreSQL', value: 78, tone: 'bg-[var(--accent-warm)]' },
    { name: 'Svelte', value: 75, tone: 'bg-[var(--accent-danger)]' }
  ];
</script>

<section id={id} class="section-shell" use:sectionObserver={{ id }}>
  <div class="section-inner">
    <div class="reveal" use:scrollReveal>
      <SectionHeading
        eyebrow="Skills"
        title="Categorized, visible, and easy to scan."
        description="The stack is presented as a system: categories for breadth, progress bars for confidence, and enough room to signal what is actively growing."
      />
    </div>

    <div class="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
      {#each skillGroups as group}
        <article class="reveal surface rounded-[1.75rem] p-5" use:scrollReveal>
          <h3 class="font-[var(--font-display)] text-xl font-semibold text-[var(--text-primary)]">{group.name}</h3>
          <p class="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{group.summary}</p>

          <div class="mt-5 space-y-4">
            {#each group.items as item}
              <div>
                <div class="flex items-center justify-between gap-3 text-sm">
                  <span class="font-medium text-[var(--text-primary)]">{item.name}</span>
                  <span class="text-[var(--text-tertiary)]">{item.note ?? `${item.level}%`}</span>
                </div>
                <div class="mt-2 h-2 overflow-hidden rounded-full bg-white/8">
                  <div class="h-full rounded-full bg-[linear-gradient(90deg,var(--accent-primary),var(--accent-secondary))]" style={`width: ${item.level}%`}></div>
                </div>
              </div>
            {/each}
          </div>
        </article>
      {/each}
    </div>

    <div class="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <div class="reveal surface rounded-[1.75rem] p-5" use:scrollReveal>
        <h3 class="font-[var(--font-display)] text-xl font-semibold text-[var(--text-primary)]">Featured proficiencies</h3>
        <p class="mt-2 text-sm leading-6 text-[var(--text-secondary)]">The highest-confidence tools and frameworks, shown with explicit progress so the story is easy to scan.</p>
      </div>

      <div class="reveal surface rounded-[1.75rem] p-5" use:scrollReveal>
        <div class="space-y-4">
          {#each featured as skill}
            <div>
              <div class="flex items-center justify-between gap-3 text-sm">
                <span class="font-medium text-[var(--text-primary)]">{skill.name}</span>
                <span class="text-[var(--text-tertiary)]">{skill.value}%</span>
              </div>
              <div class="mt-2 h-2 overflow-hidden rounded-full bg-white/8">
                <div class={`h-full rounded-full ${skill.tone}`} style={`width: ${skill.value}%`}></div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>
