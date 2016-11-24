/**
 * Created by Glacier on 16/10/26.
 */
import './mobile.scss';
import moment from 'moment';

let app = $('<div></div>');
app.html('<h1>Hello Mobile World!</h1>');
const p = Promise.resolve(88);
p.then((number) => {
    app.append('<p>Promise number is ' + number + ', now is ' + moment().format('YYYY-MM-DD HH:mm:ss') + '</p>');
});
$('body').append(app);
