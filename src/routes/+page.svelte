<script lang="ts">
  import HeroSection from '$lib/components/sections/HeroSection.svelte';
  import AboutSection from '$lib/components/sections/AboutSection.svelte';
  import ProjectsSection from '$lib/components/sections/ProjectsSection.svelte';
  import SkillsSection from '$lib/components/sections/SkillsSection.svelte';
  import ContactSection from '$lib/components/sections/ContactSection.svelte';
  import Footer from '$lib/components/shared/Footer.svelte';
</script>

<main id="main" class="relative">
  <HeroSection id="hero" />
  <AboutSection id="about" />
  <ProjectsSection id="projects" />
  <SkillsSection id="skills" />
  <ContactSection id="contact" />
  <Footer />
</main>
