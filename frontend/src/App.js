import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ModalComp from "./components/Comp";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [alunoParaEditar, setAlunoParaEditar] = useState(null);


  //Busca dados da API vindo do BACKEND
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/alunos");
      const jsonData = await response.json();
      setData(jsonData);
    };

    fetchData();
  }, []);

  //Função para remover dados com base no ID do aluno
  const handleRemover = async (id) => {
    await fetch(`http://localhost:8080/alunos/${id}`, {
      method: "DELETE",
    });
    const newData = data.filter((aluno) => aluno.id !== id);
    setData(newData);
  };

  const handleEditar = (aluno) => {
    setAlunoParaEditar(aluno);
    onOpen();
  };


  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      fontSize="20px"
      fontFamily="poppins"
    >
      <Box maxW={800} w="100%" h="100vh" py={10} px={2}>
        <Button
          colorScheme="blue"
          onClick={() => {
            setAlunoParaEditar(null);
            onOpen();
          }}
        >
          NOVO CADASTRO
        </Button>

        <Box overflowY="auto" height="100%">
          <Table mt="6">
            <Thead>
              <Tr>
                <Th fontSize="20px">
                  Nome
                </Th>
                <Th fontSize="20px">
                  E-Mail
                </Th>
                <Th fontSize="20px">
                  Telefone
                </Th>
                <Th fontSize="20px">
                  Ações
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map(({ id, nome, email, telefone,foto }) => (
                <Tr key={id} cursor="pointer" _hover={{ bg: "gray.100" }}>
                  <Td>{nome}</Td>
                  <Td>{email}</Td>
                  <Td>{telefone}</Td>
                  
                  <Td>
                    <Button
                      colorScheme="blue"
                      size="sm"
                      onClick={() =>
                        handleEditar({ id, nome, email, telefone })
                      }
                    >
                      Editar
                    </Button>
                    <Button
                      colorScheme="red"
                      size="sm"
                      ml={2}
                      onClick={() => handleRemover(id)}
                    >
                      Remover
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      {isOpen && (
        <ModalComp
          isOpen={isOpen}
          onClose={onClose}
          alunoParaEditar={alunoParaEditar}
          setData={setData}
        />
      )}
    </Flex>
  );
};

export default App;
