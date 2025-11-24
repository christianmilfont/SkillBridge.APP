# SkillBridge - Mobile App (React Native / Expo)

**Integrantes:** Christian Milfont - RM555345 / Iago Victor - RM558450
**Link do vídeo (YouTube):** 
**Commit hash demonstrado no app:** `COMMIT_HASH_AQUI`

## Descrição da solução (Global Solution)
SkillBridge é uma plataforma de requalificação que conecta pessoas a micro-cursos, micro-tarefas, vagas e mentorias, gerando learning paths personalizados por IA. A aplicação mobile consome a API principal (.NET) que expõe endpoints para usuários, cursos, vagas, matrículas e feedbacks. O app permite autenticação com JWT, CRUD de matrículas/feedbacks e navegação entre telas.

## Telas implementadas
1. Login (autenticação JWT)  
2. Home / Dashboard (resumo do usuário)  
3. Catálogo de Cursos (listar)  
4. Detalhe do Curso (ver + inscrever / cancelar inscrição)  
5. Vagas (listar)  
6. Perfil (editar dados do usuário)  
7. Sobre o App (hash do commit) — extra para requisitos

## Tecnologias
- Frontend: React Native + Expo
- Navegação: React Navigation
- Requisições: Axios
- Armazenamento de token: `expo-secure-store` (fallback: AsyncStorage)
- Linter/Formatter: ESLint + Prettier (opcional)
- Build / Publicação: Expo / EAS ou Firebase App Distribution para teste

## Endpoints (exemplo por enquanto)
- `POST /api/auth/login` → recebe `{username, password}` retorna `{token, user}`
- `GET /api/courses` → lista cursos
- `GET /api/courses/{id}` → detalhe curso
- `POST /api/enrollments` → cria matrícula `{userId, courseId}`
- `GET /api/enrollments?userId={}` → listar matrículas
- `PUT /api/enrollments/{id}` → atualizar
- `DELETE /api/enrollments/{id}` → deletar
- `POST /api/feedbacks` → criar feedback

> Troque as URLs nos serviços pelo endereço da sua API .NET (ex: `https://api.skillbridge.yourdomain`).

## Como rodar
1. Tenha Node.js e Expo CLI (`npm i -g expo-cli`) instalados.
2. `git clone <repo>`  
3. `cd SkillBridge.APP`  
4. `npm install`  
5. `npx expo start`

## Publicação


### Estrutura sugerida do projeto
```
  ├─ /src
  │  ├─ /api
  │  │   └─ api.ts                // Axios + interceptors
  │  ├─ /contexts
  │  │   └─ AuthContext.tsx   // Auth + token handling
  │  │   └─ ProfileContext.tsx
  │  │   └─ ThemeContext.tsx
  │  │   └─ api.ts       
  │  ├─ /screens
  │  │   ├─ AboutScreen.tsx
  │  │   ├─ CompetencyScreen.tsx
  │  │   ├─ CourseDetails.tsx
  │  │   ├─ CoursesScreen.tsx
  │  │   ├─ CreateProfileScreen.tsx
  │  │   ├─ HomeScreen.tsx
  │  │   ├─ JobsScreen.tsx
  │  │   ├─ LoginScreen.tsx
  │  │   ├─ ProfileScreen.tsx
  │  │   ├─ VacancyDetails.tsx
  │  ├─ /components
  │  │   ├─ CourseCard.tsx
  │  │   └─ Button.tsx
  │  ├─ /styles
  │  │   └─ theme.ts
  │  └─ App.tsx
  ├─ app.json / app.config.js
  ├─ package.json
  └─ README.md
```
  │  │   └─ AuthContext.tsx
  │  │   └─ ProfileContext.tsx
  │  │   └─ ThemeContext.tsx
  │  │   └─ api.ts
