interface Jogador extends BaseModel {
  id: string;
  nome: string;
  email: string;
  idade: number;
  sexo: "M" | "F" | "Outro";
}
