import app from './app'
import './database'

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log(`Server en puerto ${app.get('port')}`);
});