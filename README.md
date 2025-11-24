# SkillBridge - Mobile App (React Native / Expo)

![Imagem do WhatsApp de 2025-11-23 à(s) 17 49 10_69b3d90d](https://github.com/user-attachments/assets/f2fbd6a0-869c-4f8b-8dd2-efa55b2a8326)

**Integrantes:** Christian Milfont - RM555345 / Iago Victor - RM558450

## Descrição da solução (Global Solution)
SkillBridge é uma plataforma de requalificação que conecta pessoas a micro-cursos, micro-tarefas, vagas e mentorias, gerando learning paths personalizados por IA. A aplicação mobile consome a API principal (.NET) que expõe endpoints para usuários, cursos, vagas, matrículas e feedbacks. O app permite autenticação com JWT, CRUD de matrículas/feedbacks e navegação entre telas.

## Telas implementadas
1. Login (autenticação JWT)  
2. Home / Dashboard (resumo do usuário, com cursos recomendados)  
3. Catálogo de Cursos (listar cursos recomendados, baseadas nas suas competências)  
4. Detalhe do Curso (ver detalhes dos cursos)  
5. Vagas (listar vagas recomendadas, baseadas nas suas competências)  
6. Perfil (dados do usuário com suas competências)  
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
link do app publicado:
https://console.firebase.google.com/u/0/project/skillbridge-app-19682/appdistribution/app/android:com.chrischris021.skillbridgeapp/releases?hl=pt-br
<img width="1420" height="606" alt="image" src="https://github.com/user-attachments/assets/94d79f63-8abd-497e-8cba-893af70f6a28" />


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

