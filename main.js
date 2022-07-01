function loadData() {

    let user = getSession();
    document.getElementById('user').innerHTML = user.name;
    document.getElementById('balance').innerHTML = `$${user.cash}`;
    document.getElementById('depositBtn').addEventListener('click', deposit);
    document.getElementById('withdrawalBtn').addEventListener('click', retirar)
    document.getElementById('closeSesion').addEventListener('click', closeSesion)
}


loadData();

function updateUserCash(cash) {
    let user = getSession();
    user.cash = cash;
    updateUser(user);
    return getSession();
}

function deposit() {
    let monto = document.getElementById('amount').value;
    let user = getSession();
    let saldoTotal = user.cash + parseInt(monto);

    if (saldoTotal && monto) {

        if (saldoTotal > 990) {
            Swal.fire(
                'Transacción fallida',
                'Por disposición gubernamental el saldo máximo permitido es de  $990',
                'error'
            );

        } else {
            user = updateUserCash(saldoTotal);
            document.getElementById('balance').innerHTML = `$${user.cash}`;
        }

    } else {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });
        Toast.fire({
            icon: 'info',
            title: 'Ingresa una cantidad'
        });
    }

}

function retirar() {
    let monto = document.getElementById('amount').value;
    let user = getSession();

    if (user.cash && monto) {
        if (user.cash >= monto) {
            let saldoTotal = user.cash - parseInt(monto);
            if (saldoTotal < 10) {
                Swal.fire(
                    'Transacción fallida',
                    'Por políticas de Bancomemer no puedes tener menos de $10 en tu cuenta',
                    'error'
                );

            } else {
                user = updateUserCash(saldoTotal);
                document.getElementById('balance').innerHTML = `$${user.cash}`;
            }

        } else {
            Swal.fire(
                'Su saldo es insuficiente',
                'Intenta con una menor cantidad',
                'error'
            );
        }

    } else {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });
        Toast.fire({
            icon: 'info',
            title: 'Ingresa una cantidad por favor'
        });
    }
}

function closeSesion() {
    localStorage.removeItem('user');
    window.location.href = "index.html";
}