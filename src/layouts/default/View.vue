<template>
  <v-main>
	<v-layout class="rounded rounded-md">
		<v-navigation-drawer>
			<TaskFilter />
			<v-list>
				<v-list-item title="Filter"></v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-navigation-drawer location="right">
		<v-list>
			<v-list-item title="Task Detail"></v-list-item>
		</v-list>
		</v-navigation-drawer>

		<v-main class="d-flex justify-center bg-grey-lighten-4" style="min-height: 100dvh" >
    		<router-view />
		</v-main>
	</v-layout>
  </v-main>
</template>

<script setup>
  //
</script>
