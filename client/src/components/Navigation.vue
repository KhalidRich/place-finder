<template>
  <div>
    <vs-navbar v-model="activeItem" class="nabarx">
      <div slot="title">
        <vs-navbar-title>
          Place Finder
        </vs-navbar-title>
      </div>

      <vs-navbar-item index="0">
        <a href="#">Home</a>
      </vs-navbar-item>
      <vs-navbar-item index="1">
        <a href="/search">Search</a>
      </vs-navbar-item>
      <vs-navbar-item index="2">
        <a href="/liked">Favorites</a>
      </vs-navbar-item>
    </vs-navbar>
  </div>
</template>

<style> 
  nav {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  .spacing { 
    Margin-right: 10px; 
  } 
  .nabarx {
    margin-bottom: 25px;
  }
</style>