import { StyleSheet } from "react-native";

export const Tar = "#131826";
export const Plum = "#5B3547";
export const Mauave = "#8B677C";
export const Cream = "#EFEADD";

export const globalStyles = StyleSheet.create({
  filledButtonContainer: {
    backgroundColor: Cream,
    paddingVertical: 10,
    width: "80%",
    alignSelf: "center",
    borderRadius: 5,
    marginVertical: 10,
  },
  filledButtonText: {
    color: Tar,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  filledButtonContainerTar: {
    backgroundColor: Tar,
    paddingVertical: 10,
    width: "100%",
    borderRadius: 5,
    marginVertical: 10,
  },
  filledButtonTextTar: {
    color: Cream,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  outlinedButtonContainer: {
    backgroundColor: "transparent",
    textAlign: "center",
    paddingVertical: 10,
    width: "80%",
    alignSelf: "center",
    color: Cream,
    fontWeight: "bold",
    fontSize: 18,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Cream,
    marginVertical: 10,
  },
  outlinedButtonText: {
    color: Cream,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  outlinedButtonContainerTar: {
    backgroundColor: "transparent",
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
    width: "100%",
    alignSelf: "center",
    color: Tar,
    fontWeight: "bold",
    fontSize: 18,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Tar,
    marginVertical: 10,
  },
  outlinedButtonTextTar: {
    color: Tar,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});
