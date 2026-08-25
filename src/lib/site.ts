// Central place for site-wide content that Terrence will want to edit directly.
// Anything here is placeholder copy standing in for real ministry content.

export const site = {
  name: "Shine Ministries",
  tagline: "Brighter and Brighter.",
  verse: {
    text: "“The path of the righteous is like the morning sun, shining ever brighter till the full light of day.”",
    reference: "Proverbs 4:18",
  },
  // Two more verses the ministry holds close — 2 Corinthians 3:18 was the
  // theme of the "Glory to Glory" retreat pictured on the About page.
  verses: [
    {
      text: "“Dear friend, I pray that you may enjoy good health and that all may go well with you, even as your soul is getting along well.”",
      reference: "3 John 1:2",
    },
    {
      text: "“And we all, who with unveiled faces contemplate the Lord's glory, are being transformed into his image with ever-increasing glory, which comes from the Lord, who is the Spirit.”",
      reference: "2 Corinthians 3:18",
    },
  ],
  description:
    "Gathering and empowering women to cultivate a healthy soul that shines His glory.",
  ageNote: "All women welcome, ages 17+",
  email: "shineministriesoklahoma@gmail.com",
  // Real service area, from the Shine Ministries OK Facebook page.
  serviceArea: ["Oklahoma City", "Edmond", "Norman", "Moore", "Yukon", "Piedmont", "Tuttle"],
  social: {
    instagram: "https://instagram.com/shineministriesok",
    facebook: "https://www.facebook.com/profile.php?id=61589769434289",
  },
  // Bible Studies and Get Involved are built (src/app/bible-studies,
  // src/app/get-involved) but intentionally left out of nav for now —
  // add them back here when ready to relaunch those pages.
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/events", label: "Events" },
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

// Real founder — bio is still being written; photo pending (public/brand/gina.jpg).
export const founder = {
  name: "Gina Helms-Ouren",
  role: "Founder",
  bio: "Gina's story is coming soon — check back for more about her heart behind Shine Ministries.",
  photo: "/brand/gina.jpg",
};

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
