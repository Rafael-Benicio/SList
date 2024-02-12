import { Text } from "react-native";
import theme from "../utils/themePalet";
// Mansagem de aviso
const TextAviso = (cSave = true) => {
  if (!cSave)
    return (
      <Text style={{ color: theme.negate, fontSize: 15 }}>
        Por favor, coloque um{"\n"}nome em sua lista
      </Text>
    );
};

export default TextAviso;
