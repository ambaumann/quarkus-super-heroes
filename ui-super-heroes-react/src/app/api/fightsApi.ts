import { emptySplitApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getApiFights: build.query<GetApiFightsApiResponse, GetApiFightsApiArg>({
      query: () => ({ url: `/api/fights` }),
    }),
    postApiFights: build.mutation<PostApiFightsApiResponse, PostApiFightsApiArg>({
      query: (queryArg) => ({ url: `/api/fights`, method: "POST", body: queryArg.fighters }),
    }),
    getApiFightsHello: build.query<GetApiFightsHelloApiResponse, GetApiFightsHelloApiArg>({
      query: () => ({ url: `/api/fights/hello` }),
    }),
    getApiFightsHelloHeroes: build.query<GetApiFightsHelloHeroesApiResponse, GetApiFightsHelloHeroesApiArg>({
      query: () => ({ url: `/api/fights/hello/heroes` }),
    }),
    getApiFightsHelloVillains: build.query<GetApiFightsHelloVillainsApiResponse, GetApiFightsHelloVillainsApiArg>({
      query: () => ({ url: `/api/fights/hello/villains` }),
    }),
    getApiFightsRandomfighters: build.query<GetApiFightsRandomfightersApiResponse, GetApiFightsRandomfightersApiArg>({
      query: () => ({ url: `/api/fights/randomfighters` }),
    }),
    getApiFightsById: build.query<GetApiFightsByIdApiResponse, GetApiFightsByIdApiArg>({
      query: (queryArg) => ({ url: `/api/fights/${queryArg.id}` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as fightsApi };
export type GetApiFightsApiResponse = /** status 200 Gets all fights, or empty list if none */ Fight[];
export type GetApiFightsApiArg = void;
export type PostApiFightsApiResponse = /** status 200 The fight */ Fight;
export type PostApiFightsApiArg = {
  fighters: Fighters;
};
export type GetApiFightsHelloApiResponse = unknown;
export type GetApiFightsHelloApiArg = void;
export type GetApiFightsHelloHeroesApiResponse = unknown;
export type GetApiFightsHelloHeroesApiArg = void;
export type GetApiFightsHelloVillainsApiResponse = unknown;
export type GetApiFightsHelloVillainsApiArg = void;
export type GetApiFightsRandomfightersApiResponse = /** status 200 Gets a random Hero and Villain fighter */ Fighters;
export type GetApiFightsRandomfightersApiArg = void;
export type GetApiFightsByIdApiResponse = /** status 200 Gets a fight for a given id */ Hero;
export type GetApiFightsByIdApiArg = {
  id: string;
};
export type Date = string;
export type ObjectId = {
  timestamp?: number;
  counter?: number;
  randomValue1?: number;
  randomValue2?: number;
  date?: Date;
};
export type Instant = string;
export type Fight = {
  id?: ObjectId;
  fightDate: Instant;
  winnerName: string;
  winnerLevel: number;
  winnerPicture: string;
  loserName: string;
  loserLevel: number;
  loserPicture: string;
  winnerTeam: string;
  loserTeam: string;
};
export type Hero = {
  name: string;
  level: number;
  picture: string;
  powers?: string;
};
export type Villain = {
  name: string;
  level: number;
  picture: string;
  powers?: string;
};
export type Fighters = {
  hero: Hero;
  villain: Villain;
};
export const {
  useGetApiFightsQuery,
  usePostApiFightsMutation,
  useGetApiFightsHelloQuery,
  useGetApiFightsHelloHeroesQuery,
  useGetApiFightsHelloVillainsQuery,
  useGetApiFightsRandomfightersQuery,
  useGetApiFightsByIdQuery,
} = injectedRtkApi;
