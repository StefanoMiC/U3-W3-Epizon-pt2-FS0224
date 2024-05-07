import { Component } from "react";
import { connect } from "react-redux";
import { setUserAction } from "../redux/actions";
// connect è la funzione di alto livello (HOF - higher order function ) che connette il nostro componente allo Store, lo sottoscrive ad ogni cambiamento di stato
// questa funzione vuole due parametri (mapStateToProps, mapDispatchToProps)

// questi parametri "mapperanno" cioè applicheranno delle prop al nostro componente a classe
// il quale avrà sia prop riguardanti la porzione di stato che vogliamo leggere,
// sia la funzione che sarà in grado di aggiornare lo stato con una dispatch dell'azione corrispondente

// 2)
const mapStateToProps = state => {
  // questa funzione viene chiamata dalla connect, e riceve lo stato globale nel suo parametro,
  // questo ci permette di estrarre i valori nella porzione di stato che ci interessa

  // li riceviamo attraverso la prop che si chiamerà con lo stesso nome che noi diamo alla proprietà di questo oggetto ritornato
  return {
    cartLength: state.cart.content.length,
    lastModified: state.cart.lastModified,
    user: state.user.content
  };
};
// 3)
const mapDispatchToProps = dispatch => {
  // questa funzinoe riceve la funzione dispatch dal suo parametro, regalato dalla connect

  // anche qui ritorneremo sempre un oggetto che rappresenta le props che verranno applicate al componente, in questo caso avremo this.props.setAdmin
  // this.props.setAdmin è una funzione! serve a ritardare l'effettiva chiamata di dispatch()

  // bisognerà a questo punto passare il valore di payload attraverso il parametro della nostra funzione setAdmin (contenuta nelle props)
  // una volta chiamata this.props.setAdmin(parametro) la dispatch interna avrà quello che le serve per funzionare

  return {
    setUser: str => {
      // dispatch({ type: "SET_USER", payload: str });
      dispatch(setUserAction(str));
    }
  };
};

class Footer extends Component {
  render() {
    // 4) ritrovo i miei valori di stato e le mie funzioni con le dispatch mappati (applicati) nelle props del componente
    console.log("FOOTER PROPS", this.props);
    return (
      <footer className={`epizon-footer ${this.props.className}`}>
        {/* setUser è una prop che contiene una funzione, che quando chiamata si aspetta una stringa in ingresso ("Epicode") e 
          solo dopo chiamata lancerà la dispatch internamente usando la stringa come payload e il type associato*/}
        <span className="text-muted" onClick={() => this.props.setUser("Epicode")}>
          Epizon {new Date().getFullYear()}©
        </span>
        <div>Prodotti nel carrello: {this.props.cartLength}</div>
        <div>Ultima modifica: {new Date(this.props.lastModified).toLocaleTimeString()}</div>
      </footer>
    );
  }
}

// 1) questo passaggio è fondamentale, è qui che la funzione connect() aumenterà il nostro componente con delle prop
// prop riguardanti lo stato, e prop per fare le nostre dispatch,
// il nome delle prop (e quello che fanno), dipenderà dalle funzione mapStateToProps e mapDispatchToProps che creiamo noi e che passiamo come argomenti della funzione connect
export default connect(mapStateToProps, mapDispatchToProps)(Footer);
