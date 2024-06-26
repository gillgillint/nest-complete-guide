import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { User } from "./user.entity";

describe('Auth service', () => {
    let service: AuthService

    beforeEach(async () => {
        // create a fake copy of the user service
        const fakeUsersService: Partial<UsersService> = {
            find: () => Promise.resolve([]),
            create: (email: string, password: string) => Promise.resolve({ id: 1, email, password } as User),
        };

        const module = await Test.createTestingModule({
            providers: [AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUsersService
                }
            ]
        }).compile()

        service = module.get(AuthService)
    })

    it('cant create an instance of auth service', async () => {
        expect(service).toBeDefined()
    })

})

