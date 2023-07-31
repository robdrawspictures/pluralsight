(function () {
    const name = document.getElementById('name');
    name.innerText = 'Sausages';

    import(/* webpackChunkName: "lodash" */ 'lodash').then(({default: _}) => {
        const message = document.getElementById('message');
        message.innerText = _.join(['Hello', 'Bobby']);
    });
})()