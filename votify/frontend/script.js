function showPage(page) {
  const mainContent = document.getElementById('main-content');
  const footer = document.getElementById('footer');
  if (mainContent && footer) {
    if (page === 'main') {
      mainContent.style.display = 'block';
      footer.style.display = 'block';
    } 
  }
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.classList.toggle('open');
    sidebar.classList.toggle('close');
  }
}

function updateThemeIcon(isDark) {
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
}

function initializeDarkMode() {
  const navbarThemeButton = document.getElementById('theme-switcher');
  const sidebarThemeButton = document.getElementById('theme-switcher-sidebar');
  
  const darkMode = localStorage.getItem('darkMode') === 'enabled';
  updateThemeIcon(darkMode);

  [navbarThemeButton, sidebarThemeButton].forEach(button => {
    if (button) {
      button.addEventListener('click', function() {
        const isDark = localStorage.getItem('darkMode') !== 'enabled';
        updateThemeIcon(isDark);
      });
    }
  });
}

// ---------------------------------------------------------------------------
// New function to load the partials (navbar.html, footer.html)
// once the DOM is ready, maintaining the same functionality
// ---------------------------------------------------------------------------
function loadDynamicPartials() {
  const navbarContainer = document.getElementById('navbar');
  const footerContainer = document.getElementById('footer');

  // Load navbar
  if (navbarContainer) {
    fetch('/navbar.html')
      .then(response => response.text())
      .then(data => {
        navbarContainer.innerHTML = data;
        // Initialize dark mode toggles within the loaded navbar
        initializeDarkMode();
      });
  }

  // Load footer
  if (footerContainer) {
    fetch('/footer.html')
      .then(response => response.text())
      .then(data => {
        footerContainer.innerHTML = data;
      });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const darkMode = localStorage.getItem('darkMode') === 'enabled';
  updateThemeIcon(darkMode);
  loadDynamicPartials();

  // Close sidebar when clicking outside of it
  const sidebar = document.getElementById('sidebar');
  document.addEventListener('click', function (event) {
    if (sidebar?.classList.contains('open') && 
        !sidebar.contains(event.target) && 
        !event.target.closest('.hamburger-menu button')) {
      toggleSidebar();
    }
  });
});

function showAnswer(button) {
  const questionText = button.querySelector("span").innerText;
  const answerBox = document.querySelector(".faq-answer");

  // Define answers for each question
  const answers = {
    "What is Votify?": "Votify is an anonymous, real-time voting platform that allows users to create and join polls for various events and competitions.",
    "Is my vote anonymous on Votify?": "Yes, all votes on Votify are anonymous, and no personal information is required to vote.",
    "How do I create a poll?": "To create a poll, simply navigate to the 'Create' page, where you can set up the poll's options and publish it for others to vote.",
    "How do I join a poll?": "You can join a poll by entering the link or room code provided by the poll creator on the 'Join' page.",
    "How many times can I vote in a poll?": "You can vote only once per IP address for each poll to ensure fairness and prevent multiple votes from the same user.",
    "What happens if I refresh or close the browser?": "If you refresh or close the browser, your ongoing poll will be lost, as no persistent data is stored.",
    "Are my poll responses stored?": "No, your poll responses are not stored. Once you submit your vote, it is recorded anonymously and is not tied to any identifiable information.",
    "Can I see the results of the poll in real-time?": "Yes, the results of the poll are updated live and can be seen immediately after voting.",
    "How can I ensure the poll remains secure?": "Votify uses various anti-cheating measures to prevent fraudulent voting, including limiting votes to one per IP address.",
    "Is there a limit to how many people can vote in a poll?": "No, there is no specific limit to how many people can vote, but the platform is designed to accommodate large numbers of voters efficiently."
  };

  // Update active class for the clicked question
  const allQuestions = document.querySelectorAll(".faq-question");
  allQuestions.forEach((q, index) => {
      q.classList.remove("active");
      if (q === button) {
          button.style.setProperty('--index', index);
      }
  });
  button.classList.add("active");

  // Update the answer text with animation
  answerBox.querySelector("h2").innerText = questionText;
  answerBox.querySelector("p").innerText = answers[questionText] || "This is the detailed answer for: \"" + questionText + "\". Add your explanation here.";

  // Trigger animation
  answerBox.style.animation = "none"; // Reset animation
  setTimeout(() => {
      answerBox.style.animation = ""; // Reapply fadeIn animation
  }, 10); // Allow repaint
}
document.addEventListener("DOMContentLoaded", function () {
  const scrollBtn = document.createElement("button");
  scrollBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>'; // FontAwesome icon
  scrollBtn.id = "scrollToTop";
  document.body.appendChild(scrollBtn);

  window.addEventListener("scroll", function () {
    if (window.scrollY > 200) {
      scrollBtn.style.display = "block"; // Show button on scrolling
    } else {
      scrollBtn.style.display = "none";
    }
  });

  scrollBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
