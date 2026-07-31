(function () {
  "use strict";
  var all = {
    mobile: {
      title: "Mobile Application Development",
      overview:
        "End-to-end development of practical mobile applications connected to a defined business objective. We connect planning, user journeys, interface work, development, integrations, testing, launch preparation, and support so the product remains coherent.",
      note: "A mobile application is useful when it makes an important customer or operational workflow easier to access and complete.",
      problems: [
        "A customer journey is fragmented across messages and manual follow-up.",
        "Teams need operational access away from a desk.",
        "An existing service needs a structured mobile channel.",
        "The product depends on disconnected tools and duplicated data.",
        "A business concept needs a reliable application foundation.",
        "A live app requires controlled improvements.",
      ],
      included: [
        "Product planning",
        "User flows",
        "Interface development",
        "Backend and API connection",
        "Functional testing",
        "Launch preparation",
        "Application support",
      ],
      types: [
        "Customer booking",
        "Internal operations",
        "Service platforms",
        "Client access",
        "Mobile commerce",
        "Subscriptions",
      ],
      process: [
        "Define the objective",
        "Map the central journey",
        "Design the interface system",
        "Build and integrate",
        "Test and prepare release",
      ],
      tech: [
        "iOS and Android",
        "Responsive API layer",
        "Authentication",
        "Payments",
        "Scheduling",
        "Notifications",
        "Analytics",
        "Cloud storage",
      ],
      faqs: [
        [
          "What does end-to-end development include?",
          "It can include product definition, interface work, application development, integration, testing, release preparation, and post-launch support according to scope.",
        ],
        [
          "Can the app connect to an existing system?",
          "Yes, provided a workable integration route exists and access, data, authentication, and failure states can be defined.",
        ],
        [
          "Can development begin from an existing prototype?",
          "Yes. The prototype and underlying requirements are reviewed before development direction is confirmed.",
        ],
      ],
    },
    mvp: {
      title: "MVP Development for Startups",
      overview:
        "Define and build a focused first release that tests the central product concept without unnecessary expansion. The work begins with the validated problem, core audience, first workflow, and evidence the product needs to gather after launch.",
      note: "An MVP is a complete first learning product—not an unfinished version of every possible feature.",
      problems: [
        "The idea has grown into an unmanageable feature list.",
        "The central user and workflow are still unclear.",
        "A prototype exists but release priorities do not.",
        "Technical dependencies have not been mapped.",
        "The team needs a tangible first product to learn from.",
        "Later opportunities are overtaking the first release.",
      ],
      included: [
        "Problem and audience framing",
        "Core workflow definition",
        "Release scope",
        "Interactive prototype",
        "MVP development",
        "Testing priorities",
        "Launch preparation",
      ],
      types: [
        "Booking MVP",
        "Subscription concept",
        "Marketplace workflow",
        "Client portal MVP",
        "Internal operations tool",
        "Service platform",
      ],
      process: [
        "Validate the repeated problem",
        "Define audience and core workflow",
        "Prototype the central journey",
        "Build the controlled release",
        "Launch and capture learning",
      ],
      tech: [
        "Cross-platform or native direction",
        "Authentication",
        "Payments where required",
        "Analytics events",
        "Notifications",
        "Admin access",
        "API integrations",
        "Release environments",
      ],
      faqs: [
        [
          "How do you control MVP scope?",
          "Each feature is evaluated against the central user journey, release objective, dependencies, and what can reasonably wait.",
        ],
        [
          "Does an MVP guarantee market success?",
          "No. It creates a more focused way to test a product assumption, but it cannot guarantee funding, adoption, or commercial outcomes.",
        ],
        [
          "Can planning be delivered before the build?",
          "Yes. Validation, scope definition, user flows, and prototyping can form a separate planning phase.",
        ],
      ],
    },
    native: {
      title: "iOS and Android Applications",
      overview:
        "Mobile experiences planned around platform requirements, product needs, and release strategy. Native behaviour, device capabilities, consistency, testing, and shared product logic are considered without assuming native development is always the right direction.",
      note: "Platform choice follows product requirements—not preference alone.",
      problems: [
        "Specific device capabilities are central to the workflow.",
        "Platform conventions materially affect the experience.",
        "A release requires distinct iOS or Android behaviour.",
        "The device range creates testing and compatibility needs.",
        "Store preparation has not been considered.",
        "Shared business logic must stay consistent across platforms.",
      ],
      included: [
        "Platform requirement review",
        "Native interaction planning",
        "Shared product logic definition",
        "Device capability integration",
        "Cross-device testing direction",
        "Store asset preparation",
        "Release support",
      ],
      types: [
        "Field applications",
        "Location-aware products",
        "Media capture tools",
        "Secure client access",
        "Commerce applications",
        "Service platforms",
      ],
      process: [
        "Review device requirements",
        "Define shared and platform-specific logic",
        "Design platform-aware interfaces",
        "Develop and test by environment",
        "Prepare each release channel",
      ],
      tech: [
        "iOS capabilities",
        "Android capabilities",
        "Secure storage",
        "Push notifications",
        "Maps and location",
        "Camera and files",
        "Backend APIs",
        "Store release tools",
      ],
      faqs: [
        [
          "Is native development always better?",
          "No. It is one option that may fit products with particular performance, device, platform, or release requirements.",
        ],
        [
          "Can the platforms share product logic?",
          "Yes. Business rules, API contracts, content models, and design principles can remain aligned even when implementations differ.",
        ],
        [
          "Do you prepare store submissions?",
          "Release preparation can include required application assets and configuration, but approval is controlled by the platform owner and cannot be guaranteed.",
        ],
      ],
    },
    cross: {
      title: "Cross-Platform Development",
      overview:
        "A shared development approach for products that need to reach iOS and Android while maintaining a controlled codebase. Shared components and product logic are balanced with platform differences, performance considerations, and integration requirements.",
      note: "Shared code is valuable only when it remains appropriate for the product experience and maintenance model.",
      problems: [
        "Two platform releases need better coordination.",
        "Product logic is duplicated across separate implementations.",
        "The feature set is suitable for a shared approach.",
        "Maintenance priorities favour a controlled codebase.",
        "Platform-specific exceptions need to be made visible.",
        "Integrations must behave consistently across devices.",
      ],
      included: [
        "Suitability assessment",
        "Shared architecture direction",
        "Reusable interface components",
        "Platform exception mapping",
        "Integration implementation",
        "Cross-device testing",
        "Coordinated release preparation",
      ],
      types: [
        "Booking products",
        "Client portals",
        "Subscription apps",
        "Internal tools",
        "Service management",
        "Commerce companions",
      ],
      process: [
        "Assess shared approach",
        "Map common and platform-specific needs",
        "Build reusable components",
        "Integrate and test both platforms",
        "Coordinate releases and maintenance",
      ],
      tech: [
        "Shared component layer",
        "Native capability bridges",
        "API clients",
        "Secure authentication",
        "Push notifications",
        "Payments",
        "Analytics",
        "Release automation",
      ],
      faqs: [
        [
          "Will everything look identical on both platforms?",
          "The product system can be consistent while preserving platform conventions and necessary differences.",
        ],
        [
          "Is cross-platform suitable for every application?",
          "No. Suitability depends on device features, performance needs, integration complexity, team priorities, and the release strategy.",
        ],
        [
          "Can platform-specific functionality be added?",
          "Often yes, but those exceptions should be identified early because they affect architecture, testing, and maintenance.",
        ],
      ],
    },
    ux: {
      title: "UI/UX Design and Prototyping",
      overview:
        "Translate business requirements into clear user journeys, wireframes, prototypes, and interface systems before development expands. The goal is to make the workflow understandable enough to evaluate and implement.",
      note: "A polished screen is not a product plan. The sequence, states, and decisions behind it matter.",
      problems: [
        "Requirements exist but the user journey does not.",
        "Screens have been designed without connected states.",
        "The team needs to test a workflow before development.",
        "Interface patterns are inconsistent across the product.",
        "Developers lack complete states and component guidance.",
        "A product improvement needs a tangible design direction.",
      ],
      included: [
        "Research input review",
        "Task flows",
        "Information architecture",
        "Wireframes",
        "Interactive prototypes",
        "Interface system",
        "Developer handoff",
      ],
      types: [
        "New MVP prototype",
        "Booking journey",
        "Client portal flow",
        "Operations dashboard",
        "Subscription onboarding",
        "Existing app redesign",
      ],
      process: [
        "Understand inputs and constraints",
        "Map tasks and information",
        "Wireframe the complete flow",
        "Prototype critical interactions",
        "Create the interface system",
      ],
      tech: [
        "Design tokens",
        "Responsive component states",
        "Accessibility patterns",
        "Prototype links",
        "Content hierarchy",
        "Interaction notes",
        "Form states",
        "Handoff documentation",
      ],
      faqs: [
        [
          "Can prototyping be a standalone service?",
          "Yes. It can clarify scope, test the central journey, and create a basis for later development.",
        ],
        [
          "Do you design only the main screens?",
          "The work considers necessary states, errors, empty views, navigation, and responsive behaviour within the agreed scope.",
        ],
        [
          "Can you improve an existing design system?",
          "Yes. Existing components, visual rules, accessibility, and workflow consistency can be reviewed and refined.",
        ],
      ],
    },
    automation: {
      title: "Business Process Automation",
      overview:
        "Replace repetitive manual steps with practical mobile and web-connected workflows. Request handling, assignment, approvals, notifications, and data synchronisation become visible parts of one operational sequence.",
      note: "Automation should clarify responsibility and state—not hide the process behind invisible rules.",
      problems: [
        "Requests arrive through disconnected channels.",
        "Tasks are assigned manually and status is difficult to trace.",
        "Repeated approvals create avoidable delays.",
        "Teams copy the same information between systems.",
        "Customers cannot see the state of their request.",
        "Operational reporting depends on incomplete records.",
      ],
      included: [
        "Workflow discovery",
        "Role and responsibility mapping",
        "Automation rules",
        "Internal interface design",
        "Notifications and approvals",
        "System connections",
        "Status and audit views",
      ],
      types: [
        "Service request flow",
        "Field task assignment",
        "Internal approvals",
        "Customer status portal",
        "Record synchronisation",
        "Operational dashboard",
      ],
      process: [
        "Observe the current process",
        "Identify repeated decisions and handoffs",
        "Design visible states and roles",
        "Connect systems and automate actions",
        "Test exceptions and operational ownership",
      ],
      tech: [
        "Workflow engine",
        "Role access",
        "Notifications",
        "CRM connection",
        "Scheduling",
        "Document storage",
        "Audit history",
        "Analytics",
      ],
      faqs: [
        [
          "Can every manual process be automated?",
          "No. The right candidates are repeated, defined steps where rules, ownership, data, and exceptions can be made explicit.",
        ],
        [
          "Will people still be able to intervene?",
          "Where the process requires judgment, manual review and override states can remain visible parts of the workflow.",
        ],
        [
          "Can automation connect existing systems?",
          "Yes, when those systems provide workable APIs or another safe integration route.",
        ],
      ],
    },
    integrations: {
      title: "API and Third-Party Integrations",
      overview:
        "Connect applications to the services and systems required for the complete workflow. We define the data exchanged, authentication method, expected responses, dependencies, errors, and ownership around each connection.",
      note: "An integration is part of the user experience whenever its delay or failure changes what a person can do.",
      problems: [
        "The app needs data from an existing business platform.",
        "Authentication is disconnected from current user accounts.",
        "Payments, maps, or scheduling are central to the journey.",
        "Integration errors are not visible to users or teams.",
        "Several services need a consistent data model.",
        "A third-party change has affected a live workflow.",
      ],
      included: [
        "Integration discovery",
        "API documentation review",
        "Data and state mapping",
        "Authentication direction",
        "Implementation",
        "Error and retry states",
        "Integration maintenance",
      ],
      types: [
        "Payment flow",
        "Identity connection",
        "CRM sync",
        "Scheduling layer",
        "Maps and location",
        "Messaging workflow",
      ],
      process: [
        "Confirm access and documentation",
        "Map data and responsibility",
        "Define success and failure states",
        "Implement and verify the connection",
        "Monitor dependencies and maintain changes",
      ],
      tech: [
        "Payments",
        "Authentication",
        "Maps",
        "CRM",
        "Scheduling",
        "Messaging",
        "Analytics",
        "Cloud storage",
        "Existing business systems",
      ],
      faqs: [
        [
          "Do you work with any API?",
          "Suitability depends on available access, documentation, authentication, usage limits, data rules, and stability.",
        ],
        [
          "How are integration failures handled?",
          "Expected error states, retries, user messaging, logging, and operational ownership are defined according to the workflow.",
        ],
        [
          "Can you maintain existing integrations?",
          "Yes. Work can include investigation, compatibility changes, and controlled updates when a provider changes.",
        ],
      ],
    },
    maintenance: {
      title: "Application Maintenance and Support",
      overview:
        "Keep launched products functional, compatible, secure, and ready for controlled improvement. Work can address updates, bug investigation, platform compatibility, monitoring, integrations, and release support.",
      note: "Maintenance is most useful when issues, dependencies, and improvements are prioritised rather than accumulated without context.",
      problems: [
        "Platform updates have affected application behaviour.",
        "A recurring issue needs structured investigation.",
        "Third-party integrations require compatibility work.",
        "Small improvements are waiting without a release path.",
        "The product lacks clear maintenance ownership.",
        "A release needs validation and operational support.",
      ],
      included: [
        "Application review",
        "Bug investigation",
        "Compatibility updates",
        "Dependency maintenance",
        "Small improvements",
        "Integration upkeep",
        "Release support",
      ],
      types: [
        "Live customer app",
        "Internal operations tool",
        "Client portal",
        "Subscription product",
        "Service platform",
        "Cross-platform application",
      ],
      process: [
        "Review product state and access",
        "Prioritise issues and dependencies",
        "Investigate and implement changes",
        "Validate affected workflows",
        "Prepare releases and the next maintenance cycle",
      ],
      tech: [
        "Platform compatibility",
        "Dependency review",
        "Error monitoring",
        "Integration diagnostics",
        "Release environments",
        "Device checks",
        "Security updates",
        "Change documentation",
      ],
      faqs: [
        [
          "Do you provide 24/7 support?",
          "No 24/7 coverage or SLA is assumed. Any support arrangement is defined explicitly according to the engagement.",
        ],
        [
          "Can you maintain an application built elsewhere?",
          "Potentially, after reviewing the codebase, access, dependencies, documentation, and current risks.",
        ],
        [
          "Can maintenance include improvements?",
          "Yes. Small, controlled product improvements can be prioritised alongside compatibility and issue work.",
        ],
      ],
    },
  };
  var links = {
    mobile: "mobile-app-development.html",
    mvp: "mvp-development.html",
    native: "ios-android-applications.html",
    cross: "cross-platform-development.html",
    ux: "ui-ux-design-prototyping.html",
    automation: "business-process-automation.html",
    integrations: "api-integrations.html",
    maintenance: "app-maintenance-support.html",
  };
  var media = {
    mobile: "assets/images/mobile-testing.jpg",
    mvp: "assets/images/about-team-v2.jpg",
    native: "assets/images/native-field.jpg",
    cross: "assets/images/cross-platform-team.jpg",
    ux: "assets/images/ux-wireframes.jpg",
    automation: "assets/images/workflow-meeting.jpg",
    integrations: "assets/images/integration-specialist.jpg",
    maintenance: "assets/images/maintenance-testing.jpg",
  };
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[c];
    });
  }
  function section(data, key) {
    var related = Object.keys(all)
        .filter(function (k) {
          return k !== key;
        })
        .slice(0, 5),
      image = media[key];
    return (
      '<section class="section section--light service-overview-section" aria-labelledby="overview-title"><div class="container service-overview"><div><span class="eyebrow">01 / Service overview</span><h2 class="section-title" id="overview-title">Capability focus.</h2></div><div class="service-overview-copy"><p>' +
      esc(data.overview) +
      '</p><aside class="overview-note">' +
      esc(data.note) +
      '</aside><div class="overview-route"><span>Need</span><i></i><span>Journey</span><i></i><span>Working product</span></div></div></div></section>' +
      '<section class="section service-problems-section" aria-labelledby="problems-title"><div class="container"><span class="eyebrow">02 / Problems it helps address</span><h2 class="section-title" id="problems-title">When direction is unclear.</h2><div class="problem-grid">' +
      data.problems
        .map(function (x, i) {
          return (
            '<article class="problem-card"><small>CONTEXT ' +
            String(i + 1).padStart(2, "0") +
            "</small><p>" +
            esc(x) +
            "</p><i></i></article>"
          );
        })
        .join("") +
      "</div></div></section>" +
      '<section class="section section--dark service-included-section" aria-labelledby="included-title"><div class="container included-layout"><div><span class="eyebrow">03 / What is included</span><h2 class="section-title" id="included-title">Workstreams shaped to scope.</h2><div class="deliverable-list">' +
      data.included
        .map(function (x, i) {
          return (
            '<div class="deliverable"><strong>' +
            esc(x) +
            "</strong><span>" +
            String(i + 1).padStart(2, "0") +
            "</span></div>"
          );
        })
        .join("") +
      '</div></div><div class="include-mockup"><div class="include-orbit"><i></i><i></i></div><div class="phone"><div class="phone-screen"><small>CAPABILITY VIEW</small><strong>' +
      esc(data.title) +
      '</strong><div class="ui-stack"><div class="ui-card">Product direction</div><div class="ui-card">Core workflow</div><div class="ui-action">Defined next step</div></div></div></div><aside>Scope remains visible across every workstream.</aside></div></div></section>' +
      '<section class="section service-types-section" aria-labelledby="types-title"><div class="container"><span class="eyebrow">04 / Suitable product types</span><h2 class="section-title" id="types-title">Applied where context fits.</h2><div class="product-type-grid">' +
      data.types
        .map(function (x, i) {
          return (
            '<article class="product-type"><small>' +
            String(i + 1).padStart(2, "0") +
            "</small><h3>" +
            esc(x) +
            '</h3><div class="type-ui"><i></i><i></i><i></i></div><p>Assessed against the real workflow, access and constraints.</p></article>'
          );
        })
        .join("") +
      "</div></div></section>" +
      '<section class="section section--light service-process-section" aria-labelledby="delivery-title"><div class="container"><div class="slider-head"><div><span class="eyebrow">05 / Delivery process</span><h2 class="section-title" id="delivery-title">From context to release.</h2></div><div class="slider-controls"><button class="icon-btn process-prev" type="button" aria-label="Previous process step">←</button><span class="process-fraction"></span><button class="icon-btn process-next" type="button" aria-label="Next process step">→</button></div></div><div class="swiper service-process-swiper"><div class="swiper-wrapper">' +
      data.process
        .map(function (x, i) {
          return (
            '<div class="swiper-slide"><article class="service-process-step"><small>' +
            String(i + 1).padStart(2, "0") +
            " / STEP</small><h3>" +
            esc(x) +
            "</h3><div><i></i><i></i><i></i></div><span>Next decision visible</span></article></div>"
          );
        })
        .join("") +
      "</div></div></div></section>" +
      '<section class="service-media-section" aria-labelledby="tech-title" data-parallax-section><img src="assets/images/card-paralaks.jpg" alt="' +
      esc(data.title) +
      ' product card with workflow depth" loading="lazy" data-parallax-image><div class="container service-media-panel"><div><span class="eyebrow">06 / Technology and product context</span><h2 class="section-title" id="tech-title">Workflow-led technology.</h2><p>Technical choices follow access, platforms, data responsibility and maintenance priorities.</p><div class="parallax-actions"><a class="ref-button ref-button--lime" href="contact.html#project-form"><span>Discuss this service</span><b><i data-lucide="arrow-up-right"></i></b></a><a class="ref-button ref-button--lavender" href="services.html"><span>All capabilities</span><b><i data-lucide="arrow-up-right"></i></b></a></div></div></div></section>' +
      '<section class="section service-related-section" aria-labelledby="related-title"><div class="container"><div class="slider-head"><div><span class="eyebrow">07 / Related services</span><h2 class="section-title" id="related-title">Connect the next capability.</h2></div><div class="slider-controls"><button class="icon-btn related-prev" type="button" aria-label="Previous related service">←</button><span class="related-fraction"></span><button class="icon-btn related-next" type="button" aria-label="Next related service">→</button></div></div><div class="swiper related-swiper"><div class="swiper-wrapper">' +
      related
        .map(function (k, i) {
          return (
            '<div class="swiper-slide"><a class="related-card" href="' +
            links[k] +
            '"><small>' +
            String(i + 1).padStart(2, "0") +
            " / RELATED</small><h3>" +
            esc(all[k].title) +
            '</h3><div class="related-visual"><i></i><i></i><i></i></div><span>View capability →</span></a></div>'
          );
        })
        .join("") +
      "</div></div></div></section>" +
      '<section class="section section--light service-faq-section" aria-labelledby="service-faq-title"><div class="container service-faq-layout"><div><span class="eyebrow">08 / FAQ and project request</span><h2 class="section-title" id="service-faq-title">Clarify before scope.</h2><div class="accordion" data-accordion>' +
      data.faqs
        .map(function (q) {
          return (
            '<div class="accordion-item"><button class="accordion-trigger" aria-expanded="false">' +
            esc(q[0]) +
            ' <span aria-hidden="true">＋</span></button><div class="accordion-panel"><div><p>' +
            esc(q[1]) +
            "</p></div></div></div>"
          );
        })
        .join("") +
      '</div></div><aside class="service-cta-box"><small>START WITH THE WORKFLOW</small><h3>Bring us the product problem that needs to work.</h3><p>Share the current stage, intended audience and immediate priority.</p><a class="ref-button ref-button--lime" href="contact.html#project-form"><span>Start a project request</span><b>↗</b></a><div class="service-cta-orbit"><i></i></div></aside></div></section>'
    );
  }
  function init() {
    var key = document.body.dataset.service,
      data = all[key],
      target = document.querySelector("[data-service-content]");
    if (!data || !target) return;
    target.innerHTML = section(data, key);
    var process = document.querySelector(".service-process-swiper");
    if (process && !process.dataset.swiperReady) {
      process.dataset.swiperReady = "true";
      new Swiper(process, {
        slidesPerView: 1,
        navigation: { prevEl: ".process-prev", nextEl: ".process-next" },
        pagination: { el: ".process-fraction" },
        keyboard: { enabled: true },
        breakpoints: { 700: { slidesPerView: 2 }, 1050: { slidesPerView: 3 } },
      });
    }
    var related = document.querySelector(".related-swiper");
    if (related && !related.dataset.swiperReady) {
      related.dataset.swiperReady = "true";
      new Swiper(related, {
        slidesPerView: 1,
        navigation: { prevEl: ".related-prev", nextEl: ".related-next" },
        pagination: { el: ".related-fraction" },
        keyboard: { enabled: true },
        breakpoints: { 700: { slidesPerView: 2 }, 1050: { slidesPerView: 3 } },
      });
    }
  }
  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();
})();
