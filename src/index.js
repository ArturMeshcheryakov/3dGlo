'use strict';

import 'nodelist-foreach-polyfill';
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';
import '@babel/polyfill';
import elementClosest from 'element-closest';
elementClosest(window);

import countTimer from './modules/countTimer'
import toggleMenu from './modules/toggleMenu'
import togglePopup from './modules/togglePopup'
import scroll from './modules/scroll'
import tabs from './modules/tabs'
import slider from './modules/slider'
import team from './modules/team'
import calc from './modules/calc'
import sendForm from './modules/sendForm'

countTimer('2 august 2020');
toggleMenu();
togglePopup();
scroll();
tabs();
slider();
team();
calc(100);
sendForm();
