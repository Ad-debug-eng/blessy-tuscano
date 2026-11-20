import { asset } from "../utils/asset";

const rawProjects = [
  {
    id: "neon-glow",
    title: "BETSUBARA",
    category: "Photography",
    tags: ["BRANDING "],
    displayTag: "Branding",
    year: "",
    client: "",
    description: "The opportunity was to move away from the polished, transactional language of modern cafés and create a dessert space built around comfort, familiarity and small moments of indulgence. Betsubara uses the idea of a “separate stomach for dessert” as its strategic anchor, translating it into a neighbourhood-inspired brand world that feels personal, playful and inviting.",
    coverImage: "/assets-v1/40e6c2b8-88d1-4ebb-b967-45f8634630db/betsubara-cover.png",
    images: [
      "/assets-v1/abe4df6b-4f1a-4b63-9dc4-bbe70660f5af/betsubara-1.jpg",
      "/assets-v1/36fac21e-aa1e-49db-bf37-719fe1fa1fb7/betsubara-2.jpg",
      "/assets-v1/79943de2-2018-4c31-8440-26ddb3919160/betsubara-3.jpg",
      "/assets-v1/06f06951-e845-4a93-abeb-c2fcc3760814/betsubara-4.jpg",
      "/assets-v1/1a8a078a-a958-4ce0-834c-f486d13df02b/betsubara-5.jpg",
      "/assets-v1/dd0c7cc0-df20-4b7a-b5a8-ff1649a396f5/betsubara-6.jpg",
      "/assets-v1/bd8fef56-b4db-41f2-a070-6b34b147931c/betsubara-7.jpg",
      "/assets-v1/f4d8cc6e-4b25-479f-afb5-c7d0f57235a6/betsubara-8.jpg",
      "/assets-v1/76fe9832-aec6-4060-a640-451ea678566b/betsubara-9.jpg"
    ],
    themeBackground: "343 61% 22%"
  },
  {
    id: "light-forms",
    title: "THE ORDINARY",
    category: "Digital Art",
    tags: ["WINDOW DISPLAY"],
    displayTag: "Visual Merchandising",
    year: "",
    client: "",
    description: "How can a brand whose differentiation comes from scientific transparency make that science physically understandable within a few seconds of passing a window?",
    coverImage: "/assets-v1/47528f63-363a-47ea-9ade-3ec5510765d8/ordinary-cover.png",
    images: [
      "/assets-v1/1c449909-d345-4e99-9f2b-82025b3d9ffd/ordinary-1.jpg",
      "/assets-v1/086d3402-63db-4d97-9680-8ab26cabbd26/ordinary-2.jpg",
      "/assets-v1/0fbfd058-7c93-4883-a28e-5625c769a6be/ordinary-3.jpg",
      "/assets-v1/4a39050a-a614-45f7-9602-8c868d8d5848/ordinary-4.jpg",
      "/assets-v1/4b0f46fb-a003-4b56-bc5e-37441a2f47ef/ordinary-5.jpg",
      "/assets-v1/ff9a76e3-f612-422e-b9d0-f28068559cec/ordinary-6.jpg",
      "/assets-v1/777863fc-b61a-46a2-ba98-30bb27d3dcc4/ordinary-7.jpg",
      "/assets-v1/14390c15-df85-42a2-809c-a7e450695131/ordinary-8.jpg",
      "/assets-v1/6d01af6b-5cf3-4758-9500-a5434e2768fc/ordinary-9.jpg",
      "/assets-v1/36c1dfaf-37b6-47e2-8980-dc1662502478/ordinary-10.jpg",
      "/assets-v1/b903427d-8a83-4192-8959-fe7a47050e52/ordinary-11.jpg"
    ],
    themeBackground: "0 0% 0%"
  },
  {
    id: "mystic-arcana",
    title: "WORK IN PROGRESS",
    category: "Fine Art",
    tags: ["CAMPAIGN "],
    displayTag: "Campaign",
    year: "",
    client: "",
    description: "QUA’s “Work in Progress” reframes professional ambition as a journey rather than a finished destination. The campaign positions the modern working woman not by what she has already achieved, but by everything she is still becoming.",
    coverImage: "/assets-v1/0fc13851-58d9-4755-a5f8-ef96718cf541/qua-cover.jpg",
    images: [
      "/assets-v1/15e17d59-4b9f-448b-b308-8b2e3800583b/qua-1.jpg",
      "/assets-v1/d24ffd3f-3477-41e2-afba-d0012a368bad/qua-2.jpg",
      "/assets-v1/52911d77-40c1-467a-a667-14e14522cfbd/qua-3.jpg",
      "/assets-v1/6468248d-e351-475b-b88e-6480f3800910/qua-4.jpg",
      "/assets-v1/36498c7b-aaf5-43df-814b-deac6cbabd11/qua-5.jpg",
      "/assets-v1/0ca0e0cf-c574-43d7-8040-d8fb4476a7fb/qua-6.jpg",
      "/assets-v1/01468431-2168-40ac-bff8-4df31b7e18de/qua-7.jpg",
      "/assets-v1/01842dc9-3569-49a9-b3f8-a16525149a75/qua-8.jpg",
      "/assets-v1/fa6c6c19-c70d-46e3-9f8d-a950ec53bfbc/qua-9.jpg"
    ],
    themeBackground: "0 0% 0%"
  },
  {
    id: "prismatic-dreams",
    title: "PHAZ4",
    category: "Photography",
    tags: ["BRANDING"],
    displayTag: "Branding",
    year: "",
    client: "",
    description: "What if women's wellness isn't communicated around a constant ideal state, but around understanding that the body changes?",
    coverImage: "/assets-v1/5d0de222-785c-44ad-b281-7ac3d4d2946e/phaz4-cover.jpg",
    images: [
      "/assets-v1/3c1f2028-c54d-4f88-b67f-ba1e9c221b39/phaz4n-1.jpg",
      "/assets-v1/0b25ec08-bdbb-4cb0-b888-6eb82b4c76f2/phaz4n-2.jpg",
      "/assets-v1/3d489730-76f6-4424-9260-85c276146852/phaz4n-3.jpg",
      "/assets-v1/3eae887c-6c35-4e70-ab01-3a41deef2836/phaz4n-4.jpg",
      "/assets-v1/a7519e4f-729a-4a48-93d0-1c25ed46c011/phaz4n-5.jpg",
      "/assets-v1/e3d309ce-14b7-4ab7-bda3-74b5c74f0ea9/phaz4n-6.jpg",
      "/assets-v1/0dac8fea-a60c-4f8f-bda8-a8b55b982f5a/phaz4n-7.jpg"
    ],
    themeBackground: "202 93% 16%"
  },
  {
    id: "digital-currents",
    title: "BENEFIT COSMETICS",
    category: "Digital Art",
    tags: ["MINIATURE STORE"],
    displayTag: "Retail Design",
    year: "",
    client: "",
    description: "Benefit already has a strong personality in its communication playful, expressive and unapologetically feminine. The opportunity was to translate that personality into a physical retail experience. I used the ritual of getting ready as the strategic entry point, turning the store into a space for discovery, play and self-expression.",
    coverImage: "/assets-v1/b4116a3b-ca3c-42d9-b396-adc9eb7cce40/benefit-cover.png",
    images: [
      "/assets-v1/7e0d9821-2b6e-45ff-b267-1624eda13f9e/benefit-1.jpg",
      "/assets-v1/c31f36e8-8860-466c-b52f-e006e6eceebc/benefit-2.jpg",
      "/assets-v1/6e82b67e-0906-42f2-b05d-0589156d867e/benefit-3.jpg",
      "/assets-v1/660c9aa2-c344-44ff-be81-f7c8bcbbe90f/benefit-4.jpg",
      "/assets-v1/08ba73ca-6214-48d9-94cf-1fbe6269ea25/benefit-5.jpg",
      "/assets-v1/c85fc7b4-291b-40d5-aaaa-e00aee25a385/benefit-6.jpg",
      "/assets-v1/5ac76b41-c15e-4e61-a149-30cad9fa5bfe/benefit-7.jpg",
      "/assets-v1/711ddeff-1f08-4932-adc0-323cb8672496/benefit-8.jpg",
      "/assets-v1/33578df5-9fa1-49e9-a058-e327fb176010/benefit-9.jpg",
      "/assets-v1/10ed1e00-4822-488d-9e58-81ca61de9a65/benefit-10.jpg",
      "/assets-v1/69d620f7-5b17-4211-9c20-13afbb0e2aea/benefit-11.jpg",
      "/assets-v1/05a5eb81-b6b2-4300-a173-7f68b39c2806/benefit-12.jpg"
    ],
    themeBackground: "174 72% 56%",
    themeForeground: "177 83% 9%"
  }
];

export const projects = rawProjects.map((p) => ({
  ...p,
  coverImage: asset(p.coverImage),
  images: (p.images || []).map(asset)
}));
