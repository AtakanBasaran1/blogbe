import { Injectable } from '@nestjs/common';
import { ProfileDto } from 'src/Dto/profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfileService {
    constructor(private prisma: PrismaService) { }

    async updateProfile(user: any, dto: ProfileDto) {
        if (!user || !user.sub) {
            throw new Error('Kullanıcı bulunamadı!');
        }

        const updatedProfile = await this.prisma.profile.upsert({
            where: { userId: user.sub },
            update: {
                name: dto.name,
                bio: dto.bio,
                age: dto.age,
                website: dto.website
            },
            create: {
                userId: user.sub,
                name: dto.name,
                bio: dto.bio,
                age: dto.age,
                website: dto.website
            },
            include: {
                user: {
                    select: {
                        email: true
                    }
                }
            }
        });

        return updatedProfile
    }

    async getProfile(user: any) {
        if (!user || !user.sub) {
            throw new Error('Kullanıcı bulunamadı!');
        }

        const profile = await this.prisma.profile.findUnique({
            where: { userId: user.sub },
            include: {
                user: {
                    select: {
                        email: true
                    }
                }
            }
        });

        return profile
    }

    async getAllProfile() {
        return this.prisma.profile.findMany({
            include: {
                user: {
                    select: {
                        email: true
                    }
                }
            }
        })
    }


}
