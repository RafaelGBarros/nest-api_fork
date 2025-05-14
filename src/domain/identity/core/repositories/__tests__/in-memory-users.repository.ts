import { User } from '../../entities/user.entity';
import { UsersRepository } from '../../repositories/users.repository';

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByCpf(cpf: string) {
    const user = this.items.find((item) => item.cpf === cpf);

    if (!user) {
      return null;
    }

    return user;
  }

  async save(user: User) {
    const index = this.items.findIndex((item) => item.id === user.id);

    if (index >= 0) {
      this.items[index] = user;
    } else {
      this.items.push(user);
    }
  }
}
