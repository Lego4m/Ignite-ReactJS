import { createServer, Model } from 'miragejs';

type User = {
  name: string;
  email: string;
  created_at: string;
}

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}) // Vão ter os dados de User, mas talvez não todos
    },

    routes() {
      this.namespace = 'api';
      this.timing = 750;

      this.get('/users');
      this.post('/users');

      this.namespace = '';  // não conflitar com as API routes do Next
      this.passthrough();  // se não tiver nenhuma rota do mirage definida, passa adiante para seu caminho original
    }
  });

  return server;
}