document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("eventForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const event = {
      name: document.getElementById("eventName").value.trim(),
      description: document.getElementById("description").value.trim(),
      date: document.getElementById("date").value,
      time: document.getElementById("time").value,
      location: document.getElementById("location").value.trim(),
    };

    if (
      !event.name ||
      !event.description ||
      !event.date ||
      !event.time ||
      !event.location
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to create event.");
        return;
      }

      alert("Event created successfully!");

      form.reset();

      window.location.href = "event.html";
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  });
});
