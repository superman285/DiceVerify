import Vue from 'vue';
import Router from 'vue-router';

import diceVerify from './components/diceVerify';
import baccaratVerify from './components/baccaratVerify';

Vue.use(Router);

const router = new Router({
    mode: 'hash',
    routes: [
        {
            path: '/dice',
            name: 'diceVerify',
            component: diceVerify,
        },
        {
            path: '/baccarat',
            name: 'baccaratVerify',
            component: baccaratVerify,
        },
    ],
});

export default router;
