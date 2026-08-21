// Central place for site-wide content that Terrence will want to edit directly.
// Anything here is placeholder copy standing in for real ministry content.

export const site = {
  name: "Shine Ministries",
  tagline: "Let your light shine.",
  verse: {
    text: "“In the same way, let your light shine before others, that they may see your good deeds and glorify your Father in heaven.”",
    reference: "Matthew 5:16",
  },
  // Mirrors the real mission line from the Shine Ministries OK Facebook page.
  description:
    "Helping women in Oklahoma City and the surrounding areas build genuine Christian community and connection. All women are welcome, ages 17 and up.",
  ageNote: "All women welcome, ages 17+",
  email: "shineministriesoklahoma@gmail.com",
  // Real service area, from the Shine Ministries OK Facebook page.
  serviceArea: ["Oklahoma City", "Edmond", "Norman", "Moore", "Yukon", "Piedmont", "Tuttle"],
  social: {
    instagram: "https://instagram.com/shineministriesok",
    facebook: "https://www.facebook.com/profile.php?id=61589769434289",
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/events", label: "Events" },
    { href: "/bible-studies", label: "Bible Studies" },
    { href: "/get-involved", label: "Get Involved" },
  ],
};

export const values = [
  {
    title: "Community",
    description:
      "We gather as sisters — sharing life's joys and struggles, praying for one another, and growing together in genuine friendship.",
    icon: "hands",
  },
  {
    title: "Growth",
    description:
      "We dig into God's Word together through Bible studies and teaching that help us grow deeper in faith, wisdom, and truth.",
    icon: "leaf",
  },
  {
    title: "Service",
    description:
      "We look outward, using our gifts to serve our church, our neighbors, and our community with open hands and open hearts.",
    icon: "sun",
  },
];

export const leaders = [
  {
    name: "Sarah Mitchell",
    role: "Ministry Director",
    bio: "Sarah has led women's ministry for over eight years with a heart for discipleship and hospitality.",
  },
  {
    name: "Rachel Simmons",
    role: "Bible Study Coordinator",
    bio: "Rachel organizes our weekly studies and loves helping women encounter Scripture in fresh, meaningful ways.",
  },
  {
    name: "Emily Carter",
    role: "Outreach & Events Lead",
    bio: "Emily plans our gatherings and outreach opportunities, always looking for new ways to serve well.",
  },
];

export const servingOpportunities = [
  {
    title: "Hospitality Team",
    description: "Welcome guests, set up gathering spaces, and help every event feel warm and inviting.",
  },
  {
    title: "Prayer Team",
    description: "Commit to praying over requests submitted by women in our community each week.",
  },
  {
    title: "Bible Study Leader",
    description: "Guide a small group through a study, fostering honest conversation and encouragement.",
  },
  {
    title: "Event Planning",
    description: "Help dream up and organize retreats, brunches, and seasonal gatherings throughout the year.",
  },
  {
    title: "Childcare Support",
    description: "Care for little ones during studies and events so moms can fully participate.",
  },
  {
    title: "Greeting & Welcome",
    description: "Be the friendly face that helps newcomers feel at home from the moment they arrive.",
  },
];

// Fallback content shown when Supabase isn't configured yet or a table is empty,
// so the site never looks broken before real data is added.
export const fallbackEvents = [
  {
    id: "fallback-1",
    title: "Fall Kickoff Brunch",
    description:
      "Join us for a cozy morning of good food, warm conversation, and an introduction to this season's Bible studies.",
    event_date: "2026-09-12",
    event_time: "10:00 AM",
    location: "Fellowship Hall",
  },
  {
    id: "fallback-2",
    title: "Women's Retreat Weekend",
    description:
      "A weekend away to rest, reconnect with God, and build friendships that last well beyond the weekend.",
    event_date: "2026-10-24",
    event_time: "Friday–Sunday",
    location: "Cedar Ridge Retreat Center",
  },
  {
    id: "fallback-3",
    title: "Christmas Tea & Testimony Night",
    description:
      "A festive evening of tea, treats, and stories of how God has been at work in the lives of women in our ministry.",
    event_date: "2026-12-05",
    event_time: "6:30 PM",
    location: "Fellowship Hall",
  },
];

export const fallbackBibleStudies = [
  {
    id: "fallback-1",
    title: "Tuesday Morning Study",
    description: "A gentle-paced study through Scripture with coffee, conversation, and childcare provided.",
    day_of_week: "Tuesdays",
    meeting_time: "9:30–11:00 AM",
    location: "Fellowship Hall",
    leader_name: "Rachel Simmons",
  },
  {
    id: "fallback-2",
    title: "Thursday Evening Study",
    description: "A study designed for women balancing work and family, meeting in the evening for deeper discussion.",
    day_of_week: "Thursdays",
    meeting_time: "6:30–8:00 PM",
    location: "Room 204",
    leader_name: "Sarah Mitchell",
  },
  {
    id: "fallback-3",
    title: "Online Study",
    description: "Join from anywhere on a flexible video call — perfect for busy seasons or if you're out of town.",
    day_of_week: "Wednesdays",
    meeting_time: "7:00 PM",
    location: "Online (Zoom link sent after sign-up)",
    leader_name: "Emily Carter",
  },
];
