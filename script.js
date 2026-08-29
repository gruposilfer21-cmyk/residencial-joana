// ===============================
// CONFIGURAÇÃO DO HOTEL
// Altere estes dados antes de publicar.
// ===============================
const HOTEL_WHATSAPP = "244924613490"; // coloque aqui o WhatsApp real, sem +, espaços ou parênteses
const HOTEL_NAME = "Residencial Joana";

document.getElementById("year").textContent = new Date().getFullYear();

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
menuBtn?.addEventListener("click", () => navLinks.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

const today = new Date().toISOString().split("T")[0];
document.querySelector('input[name="checkin"]').min = today;
document.querySelector('input[name="checkout"]').min = today;

const checkin = document.querySelector('input[name="checkin"]');
const checkout = document.querySelector('input[name="checkout"]');
checkin.addEventListener("change", () => { checkout.min = checkin.value; });

document.querySelectorAll(".reserve-room").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector('select[name="room"]').value = btn.dataset.room;
    document.querySelector("#reservar").scrollIntoView({behavior:"smooth"});
  });
});

document.getElementById("bookingForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const data = new FormData(this);
  const name = data.get("name");
  const phone = data.get("phone");
  const room = data.get("room");
  const guests = data.get("guests");
  const inDate = data.get("checkin");
  const outDate = data.get("checkout");
  const notes = data.get("notes") || "Nenhuma";

  if (outDate <= inDate) {
    alert("A data de check-out deve ser posterior ao check-in.");
    return;
  }

  const message =
`Olá, ${HOTEL_NAME}! Gostaria de fazer um pedido de reserva.

Nome: ${name}
Telefone: ${phone}
Quarto: ${room}
Hóspedes: ${guests}
Check-in: ${inDate}
Check-out: ${outDate}
Observações: ${notes}

Podem confirmar a disponibilidade e o valor total?`;

  window.open(`https://wa.me/${HOTEL_WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank");
});