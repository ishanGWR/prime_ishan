document.addEventListener("DOMContentLoaded", () => {
    // Hide loader after page loads
    setTimeout(() => {
        document.getElementById("loader").style.opacity = "0";
        setTimeout(() => {
            document.getElementById("loader").style.display = "none";
        }, 500);
    }, 1500); // Loader visible for at least 1.5 seconds

    // Smooth page transition with loader
    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault(); // Stop immediate navigation

            const targetPage = event.target.href;
            document.getElementById("loader").style.display = "flex";
            document.getElementById("loader").style.opacity = "1"; // Show loader

            setTimeout(() => {
                window.location.href = targetPage; // Navigate after effect
            }, 1500); // Delay for smooth transition
        });
    });
});
