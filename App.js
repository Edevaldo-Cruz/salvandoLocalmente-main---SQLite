import { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import NotaEditor from "./src/componentes/NotaEditor";
import { Nota } from "./src/componentes/Nota";
import { criaTabela, buscaNotas } from "./src/servicos/Notas";

export default function App() {
  useEffect(() => {
    criaTabela();
    mostrarNotas();
  }, []);

  const [notaSelecionada, setNotaSelecionada] = useState({});
  const [notas, setNotas] = useState([]);

  async function mostrarNotas() {
    const todasNotas = await buscaNotas();
    setNotas(todasNotas);
    console.log(todasNotas);
  }

  return (
    <SafeAreaView style={estilos.container}>
      <FlatList
        data={notas}
        renderItem={(nota) => (
          <Nota {...nota} setNotaSelecionada={setNotaSelecionada} />
        )}
        keyExtractor={(nota) => nota.id}
      />
      <NotaEditor
        mostrarNotas={mostrarNotas}
        notaSelecionada={notaSelecionada}
        setNotaSelecionada={setNotaSelecionada}
      />
      <StatusBar />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
});
