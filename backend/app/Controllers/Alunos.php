<?php
namespace App\Controllers;
//liberação do CORS, para que dados sejam aceitos no frontend
header("Access-Control-Allow-Methods: *");




use App\Models\Alunos_model;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Controller;

class Alunos extends Controller {

    use ResponseTrait;

    //Método para listagem dos alunos.
    public function index() {
        $alunosModel = new Alunos_model();
        $alunos = $alunosModel->findAll();
        return $this->respond($alunos);
    }

    //Método para cadastrar dados no banco de dados.
    public function create() {
        $data = $this->request->getJSON();
        $alunosModel = new Alunos_model();
        $alunosModel->insert($data);
        return $this->respondCreated();
    }

    //Método para Atualizar cadastros no banco de dados.
    public function update($id) {
        $data = $this->request->getJSON();
        $alunosModel = new Alunos_model();
        $alunosModel->update($id, $data);
        return $this->respond($data);
    }

    //Método para deletar cadastros no banco de dados.
    public function delete($id) {
        $alunosModel = new Alunos_model();
        $alunosModel->delete($id);
        return $this->respondDeleted();
    }
}
?>
