<template>
  <header class="header">
    <div class="header-content">
      <div class="logo">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="32" height="32" rx="4" fill="#6366f1" />
          <path d="M16 8L20 16H12L16 8Z" fill="white" />
          <path d="M12 18L16 26L20 18H12Z" fill="white" />
        </svg>
        <span class="logo-text">Campbell's Tomatensuppe Shop</span>
      </div>
      <div class="cart-section">
        <button class="cart-button" aria-label="Shopping cart">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path
              d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
            />
          </svg>
          <span id="count" class="cart-counter">0</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";

function handleMessage(event) {
  if (event.data.type === "cart:update") {
    const countElement = document.getElementById("count");
    if (countElement) {
      countElement.textContent = event.data.count;
    }
  }
}

onMounted(() => {
  // Nachrichten vom Host empfangen
  window.addEventListener("message", handleMessage);
});

onUnmounted(() => {
  window.removeEventListener("message", handleMessage);
});
</script>

<style scoped>
.header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 2rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
}

.cart-section {
  position: relative;
}

.cart-button {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #4b5563;
  transition: color 0.2s;
}

.cart-button:hover {
  color: #6366f1;
}

.cart-counter {
  position: absolute;
  top: 0;
  right: 0;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  transform: translate(25%, -25%);
}
</style>
