const filters = ["All", "Calicut BCA", "University", "Competitive", "Notes", "Lab"];

const materials = [
  {
    title: "Calicut University BCA Semester 1 PYQ Pack",
    exam: "Calicut BCA",
    tier: "free",
    price: "Free",
    description: "Previous year question papers for first semester Calicut University BCA students.",
    includes: ["Semester-wise paper collection", "Quick revision support", "Best niche to start with"],
  },
  {
    title: "C Programming Quick Notes",
    exam: "Notes",
    tier: "paid",
    price: "Rs. 29",
    description: "Compact programming notes pack for quick revision before internal exams.",
    includes: ["Unit-wise notes", "Important theory points", "Short and easy to consume"],
  },
  {
    title: "B.Com Semester 3 Important Questions",
    exam: "University",
    tier: "paid",
    price: "Rs. 49",
    description: "A degree-focused bundle for students who want important questions fast.",
    includes: ["Semester-based selection", "Important repeated questions", "Useful for repeat practice"],
  },
  {
    title: "BCA Lab Record Sample",
    exam: "Lab",
    tier: "free",
    price: "Free",
    description: "Sample lab record or viva support PDF to attract technical-course students.",
    includes: ["One-click download", "Good WhatsApp share material", "Builds audience trust"],
  },
  {
    title: "SSC Maths Solved PYQ Set",
    exam: "Competitive",
    tier: "paid",
    price: "Rs. 79",
    description: "A high-value competitive exam pack with PYQs, notes, and likely questions.",
    includes: ["Multiple files bundled", "Best seller positioning", "Great exam week offer"],
  },
  {
    title: "Data Structures Important Questions",
    exam: "Calicut BCA",
    tier: "paid",
    price: "Rs. 49",
    description: "Expected BCA programming questions and problem patterns for targeted preparation.",
    includes: ["Exam-focused selection", "Helpful for low prep time", "Easy upsell from free pack"],
  },
  {
    title: "B.Ed Previous Year Paper Bundle",
    exam: "University",
    tier: "paid",
    price: "Rs. 49",
    description: "Useful paper bundle for education degree students preparing semester-wise.",
    includes: ["Previous year papers", "Targeted prep format", "Fits low-cost buying behavior"],
  },
  {
    title: "Railway GK Fast Revision Sheet",
    exam: "Competitive",
    tier: "free",
    price: "Free",
    description: "Quick revision PDF to bring recurring exam-prep traffic to the site.",
    includes: ["One-click download", "Easy to share", "Works as free lead magnet"],
  },
  {
    title: "B.Sc Mathematics Formula Notes",
    exam: "Notes",
    tier: "paid",
    price: "Rs. 29",
    description: "Short formula-based revision notes for science degree students.",
    includes: ["Compact format", "Fast revision support", "Good add-on product"],
  },
];

const materialsGrid = document.getElementById("materialsGrid");
const filterRow = document.getElementById("filterRow");
const toast = document.getElementById("toast");
const guideButton = document.getElementById("guideButton");

function renderFilters(activeFilter) {
  filterRow.innerHTML = "";

  filters.forEach((filter) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `filter-chip${filter === activeFilter ? " active" : ""}`;
    button.textContent = filter;
    button.addEventListener("click", () => {
      renderFilters(filter);
      renderMaterials(filter);
    });
    filterRow.appendChild(button);
  });
}

function renderMaterials(activeFilter) {
  const visibleMaterials =
    activeFilter === "All"
      ? materials
      : materials.filter((item) => item.exam === activeFilter);

  materialsGrid.innerHTML = "";

  visibleMaterials.forEach((item) => {
    const article = document.createElement("article");
    article.className = "material-card";
    article.setAttribute("data-reveal", "");
    article.innerHTML = `
      <div class="card-topline">
        <span class="card-type ${item.tier}">${item.tier === "free" ? "Free" : "Premium"}</span>
        <span class="card-exam">${item.exam}</span>
      </div>
      <div>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
      <ul class="card-bullets">
        ${item.includes.map((point) => `<li>${point}</li>`).join("")}
      </ul>
      <div class="card-actions">
        <div class="card-meta">
          <strong class="card-price">${item.price}</strong>
          <span>${item.tier === "free" ? "Trust-building resource" : "Digital download product"}</span>
        </div>
        <button class="button ${item.tier === "free" ? "button-secondary" : ""}" type="button">
          ${item.tier === "free" ? "Preview Free Pack" : `Buy for ${item.price}`}
        </button>
      </div>
    `;

    article.querySelector("button").addEventListener("click", () => {
      const message =
        item.tier === "free"
          ? `Connect "${item.title}" to a PDF or Drive link so visitors can download it.`
          : `Connect "${item.title}" to Razorpay, WhatsApp, or a payment page to start selling.`;

      showToast(message);
    });

    materialsGrid.appendChild(article);
  });

  revealOnScroll();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

function revealOnScroll() {
  const revealElements = document.querySelectorAll("[data-reveal]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealElements.forEach((element) => observer.observe(element));
}

guideButton.addEventListener("click", () => {
  showToast("Keep the site broad, but launch first with Calicut BCA and then expand to other degrees and exams.");
});

document.querySelectorAll(".hero-copy, .hero-panel, .spotlight-card, .pricing-card, .feature-card, .launch-step").forEach((element) => {
  element.setAttribute("data-reveal", "");
});

renderFilters("All");
renderMaterials("All");
revealOnScroll();
