class Memorama {
    constructor() {
        this.totalTarjetas = [];
        this.numeroTarjetas = 0;
        this.verificadorTarjetas = [];
        this.errores = 0;
        this.imagenesCorrectas = [];
        this.agregadorTarjetas = [];
        this.nivelDificultad = 'Intermedio';
        this.numeroIntentos = 5;

        this.$contenedorGeneral = document.querySelector('.contenedor-general');
        this.$contenedorTarjetas = document.querySelector('.contenedor-tarjetas');
        this.$pantallaBloqueada = document.querySelector('.pantalla-bloqueada');
        this.$mensaje = document.querySelector('h2.mensaje');
        this.$errorContenedor = document.createElement('div');
        this.$nivelDificultad = document.createElement('div');

        //Call para escuchar por eventos
        this.eventos();
    }

    eventos() {
        window.addEventListener('DOMContentLoaded', () => {
            this.seleccionDificultad();
            this.cargaPantalla();
            window.addEventListener('contextmenu', e => {
                e.preventDefault();
            }, false);
        })
    }

    seleccionDificultad() {
        const mensaje = prompt('Selecciona el nivel de dificultad: facil(1), intermedio(2) o difícil(3). Default: intermedio');

        switch (parseInt(mensaje)) {
            case 1: {
                this.numeroIntentos = 8;
                this.nivelDificultad = 'Fácil';
                break;
            }
            case 2: break;
            case 3 : {
                this.numeroIntentos = 3;
                this.nivelDificultad = 'Difícil';
                break;
            }
            default:
                break;
        }
        this.contenedorError();
        this.mostrarNivel();
    }

    async cargaPantalla() {
        const respuesta = await fetch('../memo.json');
        const data = await respuesta.json();
        this.totalTarjetas = data;
        if (this.totalTarjetas.length > 0) {
            this.totalTarjetas.sort((a, b) => {
                return Math.random() - 0.5;
            });            
        }
        this.numeroTarjetas = this.totalTarjetas.length;

        let html = '';
        this.totalTarjetas.forEach(tarjeta => {
            html += `
                <div class="tarjeta">
                    <img class="tarjeta-img" src="${tarjeta.src}" alt="Imagen memorama"/>
                </div>
            `
        });
        this.$contenedorTarjetas.innerHTML = html;
        this.comienzaJuego();
    }

    comienzaJuego() {
        const tarjetas = document.querySelectorAll('.tarjeta');
        tarjetas.forEach(tarjeta => {
            tarjeta.addEventListener('click', clickEvent => {
                if (!clickEvent.target.classList.contains('acertada') && !clickEvent.target.classList.contains('tarjeta-img'))
                    this.clickTarjeta(clickEvent);
            });
        });
    }

    clickTarjeta(clickEvent) {
        let tarjeta = clickEvent.target;

        this.voltearTarjeta(tarjeta);

        let sourceImage = tarjeta.childNodes[1].attributes[1].value;
        this.verificadorTarjetas.push(sourceImage);

        this.agregadorTarjetas.unshift(tarjeta);
        this.comparadorTarjetas();
    }

    voltearTarjeta(tarjeta) {
        tarjeta.style.backgroundImage = 'none';
        tarjeta.style.backgroundColor = 'white';
        tarjeta.childNodes[1].style.display = 'block';
    }

    fijarParAcertado() {
        this.agregadorTarjetas.forEach(tarjeta => {
            tarjeta.classList.add('acertada');
            this.imagenesCorrectas.push(tarjeta);
        });
    }

    reversoTarjetas() {
        this.agregadorTarjetas.forEach(tarjeta => {
            setTimeout(() => {
                tarjeta.style.backgroundImage = 'url(../img/cover.jpg)';
                tarjeta.childNodes[1].style.display = 'none';
            }, 1000);
        });
    }

    comparadorTarjetas() {
        if (this.verificadorTarjetas.length === 2) {
            if (this.verificadorTarjetas[0] === this.verificadorTarjetas[1]) {
                this.fijarParAcertado();
                this.victoriaJuego();
            } else {
                this.reversoTarjetas();
                this.errores++;
                this.incrementadorError();
                this.derrotaJuego();
            }
            this.verificadorTarjetas.splice(0);
            this.agregadorTarjetas.splice(0);
        }
    }

    victoriaJuego() {
        if (this.imagenesCorrectas.length === this.numeroTarjetas) {
            setTimeout(() => {
                this.$pantallaBloqueada.style.display = 'block';
                this.$mensaje.innerText = '¡Felicidades! Has ganado el juego';
            }, 1000);
            setTimeout(() => {
                location.reload();   
            }, 4000);
        }
    }

    derrotaJuego() {
        if (this.errores === this.numeroIntentos) {
            setTimeout(() => {
                this.$pantallaBloqueada.style.display = 'block';
                this.$mensaje.innerText = '¡Has perdido el juego!';
            }, 1000);
            setTimeout(() => {
                location.reload()
            }, 4000);
        }
    }

    incrementadorError() {
        this.$errorContenedor.innerText = `Errores: ${this.errores}/${this.numeroIntentos}`;
    }

    contenedorError() {
        this.$errorContenedor.classList.add('error');
        this.incrementadorError();
        this.$contenedorGeneral.appendChild(this.$errorContenedor);
    }

    mostrarNivel() {
        this.$nivelDificultad.classList.add('nivel-dificultad');
        this.$nivelDificultad.innerHTML = `Nivel de dificultad: ${this.nivelDificultad}`;
        this.$contenedorGeneral.appendChild(this.$nivelDificultad);
    }
}

new Memorama();