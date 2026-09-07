document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector("#check");
    const closeMenu = () => { menuToggle.checked = false; };
    document.querySelectorAll(".menu a, .sidebar_menu .brand").forEach(link => link.addEventListener("click", closeMenu));

    const filters = document.querySelectorAll(".filters button");
    const galleryItems = document.querySelectorAll(".gallery_item");
    filters.forEach(filter => filter.addEventListener("click", () => {
        filters.forEach(button => button.classList.remove("active"));
        filter.classList.add("active");
        galleryItems.forEach(item => item.classList.toggle("is-hidden", filter.dataset.filter !== "all" && item.dataset.category !== filter.dataset.filter));
    }));

    const lightbox = document.querySelector(".lightbox");
    galleryItems.forEach(item => item.addEventListener("click", () => {
        lightbox.querySelector("img").src = item.dataset.image;
        lightbox.querySelector("img").alt = item.querySelector("img").alt;
        lightbox.querySelector("p").textContent = item.dataset.title;
        lightbox.showModal();
    }));
    document.querySelector(".close_modal").addEventListener("click", () => lightbox.close());

    const exhibits = [
        { number: "01 / 03", title: "The Human<br>Element", text: "A meditation on the quiet expressions that tell the loudest stories." },
        { number: "02 / 03", title: "City After<br>Rain", text: "A luminous study of streets, shadows, and the lives moving between them." },
        { number: "03 / 03", title: "Wild at<br>Heart", text: "A close look at the creatures that share our corners of the world." }
    ];
    let exhibitIndex = 0;
    const updateExhibit = () => {
        const exhibit = exhibits[exhibitIndex];
        document.querySelector(".exhibit_number").textContent = exhibit.number;
        document.querySelector(".exhibit_title").innerHTML = exhibit.title;
        document.querySelector(".exhibit_text").textContent = exhibit.text;
    };
    document.querySelector(".previous").addEventListener("click", () => { exhibitIndex = (exhibitIndex + exhibits.length - 1) % exhibits.length; updateExhibit(); });
    document.querySelector(".next").addEventListener("click", () => { exhibitIndex = (exhibitIndex + 1) % exhibits.length; updateExhibit(); });

    const rsvpModal = document.querySelector(".rsvp_modal");
    document.querySelectorAll(".rsvp_button").forEach(button => button.addEventListener("click", () => {
        rsvpModal.querySelector(".event_name").textContent = button.dataset.event;
        rsvpModal.showModal();
    }));
    document.querySelector(".close_rsvp").addEventListener("click", () => rsvpModal.close());
    document.querySelector(".rsvp_form").addEventListener("submit", event => {
        event.preventDefault();
        const name = new FormData(event.currentTarget).get("guest");
        alert(`Thanks, ${name}! Your RSVP has been reserved.`);
        event.currentTarget.reset(); rsvpModal.close();
    });

    const cart = [];
    const cartModal = document.querySelector(".cart_modal");
    const money = value => `₹${value.toLocaleString("en-IN")}`;
    const renderCart = () => {
        const items = document.querySelector(".cart_items");
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        document.querySelector(".cart_count").textContent = cart.length;
        document.querySelector(".cart_total strong").textContent = money(total);
        items.innerHTML = cart.length ? cart.map((item, index) => `<div class="cart_item"><span>${item.name}<br><strong>${money(item.price)}</strong></span><button class="remove_item" data-index="${index}">Remove</button></div>`).join("") : '<p class="empty_cart">Your bag is waiting for a print.</p>';
        items.querySelectorAll(".remove_item").forEach(button => button.addEventListener("click", () => { cart.splice(Number(button.dataset.index), 1); renderCart(); }));
    };
    document.querySelector(".add_cart").addEventListener("click", event => {
        const button = event.currentTarget;
        cart.push({ name: button.dataset.product, price: Number(button.dataset.price) });
        renderCart(); button.innerHTML = 'Added <i class="fa-solid fa-check"></i>';
        setTimeout(() => { button.innerHTML = 'Add to bag <i class="fa-solid fa-plus"></i>'; }, 1200);
    });
    document.querySelector(".cart_button").addEventListener("click", () => { renderCart(); cartModal.showModal(); });
    document.querySelector(".close_cart").addEventListener("click", () => cartModal.close());
    document.querySelector(".checkout").addEventListener("click", () => {
        if (!cart.length) return;
        alert("Thank you! Checkout is ready to connect to your payment provider.");
    });

    document.querySelector(".contact_form").addEventListener("submit", event => {
        event.preventDefault();
        const form = event.currentTarget;
        form.querySelector(".form_message").textContent = `Thanks, ${new FormData(form).get("name")} — your message has been sent.`;
        form.reset();
    });

    document.querySelectorAll("dialog").forEach(dialog => dialog.addEventListener("click", event => {
        if (event.target === dialog) dialog.close();
    }));
});
