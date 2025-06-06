import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { UserNotFoundError } from '../errors/user-not-found.error';
import { Either, left, right } from '@/domain/_shared/utils/either';
import { UserRole } from '../entities/user.entity';

export interface DeactivateUserInput {
  userId: string;
}

export interface DeactivateUserOutput {
  id: string;
  name: string;
  cpf: string;
  roles: UserRole[];
  isActive: boolean;
}

type Output = Either<UserNotFoundError, { user: DeactivateUserOutput }>

@Injectable()
export class DeactivateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({
    userId,
  }: DeactivateUserInput): Promise<Output> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      return left(new UserNotFoundError(userId));
    }

    user.deactivate();

    await this.usersRepository.save(user);

    return right({
      user: {
        id: user.id,
        name: user.name,
        cpf: user.cpf,
        roles: user.roles,
        isActive: user.isActive,
      },
    });
  }
}
