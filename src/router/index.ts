import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import('@/views/About.vue'),
		},
		{
			path: '/color-convert',
			name: 'ColorConvert',
			component: () => import('@/views/ColorConvert.vue'),
		},
		{
			path: '/password-generator',
			name: 'PasswordGenerator',
			component: () => import('@/views/PasswordGenerator.vue'),
		},
		{
			path: '/permission-calculator',
			name: 'PermissionCalculator',
			component: () => import('@/views/PermissionCalculator.vue'),
		},
		{
			path: '/change-case',
			name: 'ChangeCase',
			component: () => import('@/views/ChangeCase.vue'),
		},
		{
			path: '/lorem-ipsum',
			name: 'LoremIpsum',
			component: () => import('@/views/LoremIpsum.vue'),
		},
		{
			path: '/lorem-image',
			name: 'LoremImage',
			component: () => import('@/views/LoremImage.vue'),
		},
		{
			path: '/calculate-time',
			name: 'CalculateTime',
			component: () => import('@/views/CalculateTime.vue'),
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'not-found',
			component: () => import('@/views/Error404.vue'),
		},
		{
			path: '/:pathMatch(.*)',
			name: 'bad-not-found',
			component: () => import('@/views/Error404.vue'),
		},
	],
});

export default router;
