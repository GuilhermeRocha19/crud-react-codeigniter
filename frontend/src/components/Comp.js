import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
} from "@chakra-ui/react";
import axios from "axios";

// URL base da API
const API_URL = "http://localhost:8080";





const ModalComp = ({ onClose, alunoParaEditar, setData }) => {
  // State para armazenar os dados do formulário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [foto, setFoto] = useState("");

  // Preenche os campos do formulário com os dados do aluno selecionado para edição
  useEffect(() => {
    if (alunoParaEditar) {
      setNome(alunoParaEditar.nome);
      setEmail(alunoParaEditar.email);
      setTelefone(alunoParaEditar.telefone);
      setFoto(alunoParaEditar.foto);
    }
  }, [alunoParaEditar]);







  // Função para salvar ou atualizar um aluno
  const handleSalvar = async () => {
    try {
      let response;
      if (alunoParaEditar) {
        // Atualiza os dados do aluno
        response = await axios.put(
          `${API_URL}/alunos/${alunoParaEditar.id}`,
          {
            nome: nome,
            email: email,
            telefone: telefone,
            foto: foto,
          }
        );
      } else {
        // Cria um novo aluno
        response = await axios.post(`${API_URL}/alunos`, {
          nome: nome,
          email: email,
          telefone: telefone,
          foto: foto,
        });
        // Recarrega a página após adicionar um novo aluno
        
      }
      console.log("Aluno salvo com sucesso:", response.data);
      // Atualiza o estado dos dados com os novos dados do aluno
      setData((prevData) => {
        const newData = [...prevData];
        if (alunoParaEditar) {
          const index = newData.findIndex(
            (aluno) => aluno.id === alunoParaEditar.id
          );
          newData[index] = response.data;
        } else {
          newData.push(response.data);
        }
        return newData;
      });
      onClose();
        //Recarregar página para evitar erros nos próximos eventos
    setTimeout(() => {
      window.location.reload(); 
    }, 10); 
    } catch (error) {
      console.error("Erro ao salvar aluno:", error);
    }
  };






  // Função para excluir um aluno
  const handleExcluir = async () => {
    try {
      await axios.delete(`${API_URL}/alunos/${alunoParaEditar.id}`);
      console.log("Aluno deletado com sucesso");
      // Remove o aluno excluído do estado dos dados
      setData((prevData) =>
        prevData.filter((aluno) => aluno.id !== alunoParaEditar.id)
      );
      onClose();
    } catch (error) {
      console.error("Erro ao excluir aluno:", error);
    }
  };






  return (
    <>
      <Modal isOpen={true} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastro de Aluno</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl display="flex" flexDir="column" gap={4}>
              <Box>
                <FormLabel>Nome</FormLabel>
                <Input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>E-mail</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Telefone</FormLabel>
                <Input
                  type="text"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Foto</FormLabel>
                <Input
                  type="file"
                  value={foto}
                  onChange={(e) => setFoto(e.target.value)}
                />
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent="start">
            <Button colorScheme="green" mr={3} onClick={handleSalvar}>
              SALVAR
            </Button>
            {alunoParaEditar && (
              <Button colorScheme="red" mr={3} onClick={handleExcluir}>
                EXCLUIR
              </Button>
            )}
            <Button colorScheme="red" onClick={onClose}>
              CANCELAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComp;
