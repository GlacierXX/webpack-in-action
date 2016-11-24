/**
 * Created by Glacier on 16/10/26.
 */
import './main.scss';
import generateText from './sub';
import $ from 'jquery';
import moment from 'moment';

let app = $('<div></div>');
app.html('<h1>Hello World!</h1>');
app.append(generateText());
const p = Promise.resolve(88);
p.then((number) => {
    app.append('<p>Promise number is ' + number + ', now is ' + moment().format('YYYY-MM-DD HH:mm:ss') + '</p>');
});
$('body').append(app);
