import { View, Text } from "react-native";
import styles from "./../List/styles";
// Elemento description
const Description = (i) => {
  const calculaTempo = (time) => {
    let today = new Date();
    let tdia = today.getDate();
    let tmes = today.getMonth();
    let tano = today.getFullYear();

    let dia = time[0];
    let mes = time[1];
    let ano = time[2];

    let tempo = (dia - tdia + (mes - tmes) * 30 + (ano - tano) * 365) * -1;

    let text = "";

    if (tempo > 730) text = "Há " + Math.floor(tempo / 365) + " anos atrás";
    else if (tempo > 365) text = "Há " + Math.floor(tempo / 365) + " ano atrás";
    else if (tempo > 60) text = "Há " + Math.floor(tempo / 30) + " meses atrás";
    else if (tempo > 30) text = "Há " + Math.floor(tempo / 30) + " mês atrás";
    else if (tempo > 14) text = "Há " + Math.floor(tempo / 7) + " semanas atrás";
    else if (tempo > 7) text = "Há " + Math.floor(tempo / 7) + " semana atrás";
    else if (tempo > 1) text = "Há " + Math.floor(tempo) + " dias atrás";
    else if (tempo == 1) text = "Ontem";
    else text = "Hoje";

    return text;
  };

  return (
    <View style={styles.innertPadding}>
      <Text style={styles.itemDescText}>
        Criado : {i.created != null ? calculaTempo(i.created) : "Sem Registro"}
      </Text>
      <Text style={styles.itemDescText}>
        Última Atualização :{" "}
        {i.lastUpdate != null ? calculaTempo(i.lastUpdate) : "Sem Registro"}
      </Text>
      <Text style={styles.itemDescText}>{i.desc != "" ? "--------------" : ""}</Text>
      <Text style={styles.itemDescText}>{i.name}</Text>
      <Text style={styles.itemDescText}>{i.desc}</Text>
    </View> 
  );
};

export default Description;
