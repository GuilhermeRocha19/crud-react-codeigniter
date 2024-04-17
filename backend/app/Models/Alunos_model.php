<?php

namespace App\Models;

use CodeIgniter\Model;

//Model de Alunos criado, que herda propriedades e metodos da classe Model.
class Alunos_model extends Model {
    
    //Dados da tabela alunos definidos no Model, para que classe possa trabalhar. 
    protected $table = 'alunos';
    protected $primaryKey = 'id';
    protected $allowedFields = ['nome', 'email', 'telefone', 'foto'];
}
?>
