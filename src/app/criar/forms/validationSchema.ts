import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  nome1: Yup.string()
    .min(3, "Nome muito curto")
    .max(30, "Nome muito longo")
    .required("Nome obrigatório"),
  nome2: Yup.string()
    .min(3, "Nome muito curto")
    .max(30, "Nome muito longo")
    .required("Nome obrigatório"),
  data: Yup.date().required("Data obrigatória"),
  message: Yup.string()
    .min(40, "Mensagem muito curta")
    .required("Mensagem obrigatória"),
  emoji: Yup.string().required("Emoji obrigatório"),
  cor: Yup.string().required("Cor obrigatória"),
  file: Yup.array()
    .of(Yup.string().required("Imagem obrigatória"))
    .min(1, "Envie pelo menos 1 imagem")
});
