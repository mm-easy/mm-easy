# <img src="src/assets/logo_horizontal_3.png" width ="300">

<br>

# 프로젝트 소개

- 프로젝트 명 : 뭔말Easy?
- 프로젝트 기간 : 2024.03.26(화) ~ 05.01(수) (37일간)
- 프로젝트 소개 : 외국인 한국어 학습자들이 퀴즈와 게임을 통해 즐겁게 한국어를 학습하는 사이트

- 배포 링크 : https://www.mmeasy.kr/

<br><br>

|                                                 박지영                                                  |                                                 김소현                                                 |                                                 김연재                                                  |                                                 김형민                                                  |                                                 박재민                                                  |
| :-----------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: |
| <p align="center"><img src="src/assets/team/info_JY.png" style="width:100px; border-radius: 50%" /></p> | <p align="center"><img src="src/assets/team/info_SH.png" style="width:100px; border-radius: 50%"/></p> | <p align="center"><img src="src/assets/team/info_YJ.png" style="width:100px; border-radius: 50%" /></p> | <p align="center"><img src="src/assets/team/info_HM.png" style="width:100px; border-radius: 50%" /></p> | <p align="center"><img src="src/assets/team/info_JM.png" style="width:100px; border-radius: 50%" /></p> |
|                               [@jypark](https://github.com/redberry0217)                                |                                 [@aotoyae](https://github.com/aotoyae)                                 |                              [@YEONJAE](https://github.com/porosadporosad)                              |                                 [@C1oudys](https://github.com/C1oudys)                                  |                                 [@Seoweol](https://github.com/ahddl622)                                 |
|                                                  리더                                                   |                                                 부리더                                                 |                                                  팀원                                                   |                                                  팀원                                                   |                                                  팀원                                                   |
|               - 퀴즈 만들기 <br> - 퀴즈 리스트 <br> - 프로필 페이지 <br> - 파닉스 페이지                |                 - 퀴즈 만들기 <br> - 퀴즈 풀기 <br> - 관리자 페이지 <br> - 헤더, 푸터                  |                         - 커뮤니티 상세페이지 <br> - API 호출 <br> - 소개페이지                         |     - 로그인 및 회원가입 <br> - 메인 페이지 <br> - 타자연습 <br> - 관리자 페이지 <br> - 헤더, 푸터      |                    - 커뮤니티 메인페이지 <br> - 나의 활동페이지 <br> - 파닉스 페이지                    |
|                                                  발표                                                   |                                               시연 영상                                                |                                           배포 및 README 작성                                           |                                                대 ㅎ 민                                                 |                                              발표준비 ppt                                               |

<br><br>

# 💻 TECH STACKS

# 와이어프레임

<table>
  <thead>
    <tr>
      <th>
        메인 페이지
      </th>
      <th>
        퀴즈 페이지
      </th>
      <th>
        타자연습 페이지
      </th>
      <th>
        한글공부 페이지
      </th>
      <th>
        커뮤니티 페이지
      </th>
    </thead>
  <tbody>
  </tr>
  <tr>
    <td>
      <img src="https://github.com/mm-easy/mm-easy/blob/feat/about/public/wireframe/wireframe_main.png"  width ="1000"/>
    </td>
    <td>
      <img src="https://github.com/mm-easy/mm-easy/blob/feat/about/public/wireframe/wireframe_quiz.png" width ="1000"/>
    </td>
    <td>
     <img src="https://github.com/mm-easy/mm-easy/blob/feat/about/public/wireframe/wireframe_typing-game.png" width ="1000"/>
    </td>
       <td>
       <img src="https://github.com/mm-easy/mm-easy/blob/feat/about/public/wireframe/wireframe_phonics.png" width ="1000"/>
    </td>
       <td>
      <img src="https://github.com/mm-easy/mm-easy/blob/feat/about/public/wireframe/wireframe_community.png" width ="1000"/>
    </td>
  </tr>
  </tbody>
  <br>
  <thead>
    <tr>
    <th>
        소개 페이지
      </th>
			<th>
        관리자 페이지
      </th>
			<th>
        로그인 페이지
      </th>
			<th>
        마이페이지
      </th>
      <th>
        나의 활동 페이지
      </th>
    </thead>
  <tbody>
  </tr>
  <tr>
  <td>
      <img src="https://github.com/mm-easy/mm-easy/blob/feat/about/public/wireframe/wireframe_about.png" width ="300"/>
    </td>
		<td>
      <img src="https://github.com/mm-easy/mm-easy/blob/feat/about/public/wireframe/wireframe_admin.png" width ="1000"/>
    </td>
		<td>
      <img src="https://github.com/mm-easy/mm-easy/blob/feat/about/public/wireframe/wireframe_login.png" width ="1000"/>
    </td>
		<td>
      <img src="https://github.com/mm-easy/mm-easy/blob/feat/about/public/wireframe/wireframe_profile.png" width ="1000"/>
    </td>
    <td>
      <img src="https://github.com/mm-easy/mm-easy/blob/feat/about/public/wireframe/wireframe_my-activity.png" width ="500"/>
    </td>
  </tr>
  </tbody>
	
</table>

<br>

### 피그마

[@피그마 링크](https://www.figma.com/file/XPb8zliklkbigyFMjq833d/%EB%AD%94%EB%A7%90%EC%9D%B4%EC%A7%80_design_V1?type=design&node-id=0-1&mode=design&t=mTVVtK5cm6Bvf9Md-0)

### 시연 영상

[@시연 영상 링크]()

<br>

<br>

# 파일구조

```
📦src
 ┣ 📂api
 ┃ ┣ 📜comment.ts
 ┃ ┣ 📜comments.ts
 ┃ ┣ 📜game_scrore.ts
 ┃ ┣ 📜likes.ts
 ┃ ┣ 📜naverAPI.ts
 ┃ ┣ 📜posts.ts
 ┃ ┣ 📜profiles.ts
 ┃ ┣ 📜question_options.ts
 ┃ ┣ 📜questions.ts
 ┃ ┣ 📜quizzes.ts
 ┃ ┣ 📜reports.ts
 ┃ ┣ 📜tries.ts
 ┃ ┗ 📜users.ts
 ┣ 📂app
 ┃ ┣ 📂(main) / 📂(components)
 ┃ ┃ ┣ 📜Banner.tsx
 ┃ ┃ ┣ 📜CommunitySection.tsx
 ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┣ 📜NewsSection.tsx
 ┃ ┃ ┣ 📜QuestionEx.tsx
 ┃ ┃ ┣ 📜QuizSection.tsx
 ┃ ┃ ┗ 📜RankingSection.tsx
 ┃ ┣ 📂(non-auth)
 ┃ ┃ ┣ 📂login
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┗ 📂signup
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂about
 ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┗ 📜UsageStatus.tsx
 ┃ ┣ 📂admin
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂community
 ┃ ┃ ┣ 📂list / 📂[category]
 ┃ ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┃ ┣ 📂edit
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📜Comment.tsx
 ┃ ┃ ┃ ┃ ┣ 📜DetailPost.tsx
 ┃ ┃ ┃ ┃ ┣ 📜Like.tsx
 ┃ ┃ ┃ ┃ ┣ 📜LikeToggleButton.tsx
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📜CategorySelector.tsx
 ┃ ┃ ┃ ┣ 📜CommunityForm.tsx
 ┃ ┃ ┃ ┣ 📜CommunityMain.tsx
 ┃ ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂write
 ┃ ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┃ ┣ 📜PostEditor.tsx
 ┃ ┃ ┃ ┗ 📜TextEditor.tsx
 ┃ ┃ ┣ 📜mutations.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂menu
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂my-activity
 ┃ ┃ ┣ 📜MyActivity.tsx
 ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┗ 📜Pagination.tsx
 ┃ ┣ 📂phonics
 ┃ ┃ ┣ 📂consonants
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂vowels
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📜examplePage.tsx
 ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┣ 📜PhonicsLayout.tsx
 ┃ ┃ ┗ 📜PhonicsPlayer.tsx
 ┃ ┣ 📂profile
 ┃ ┃ ┣ 📜mutations.tsx
 ┃ ┃ ┣ 📜MyLevelAndScore.tsx
 ┃ ┃ ┣ 📜MyProfile.tsx
 ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┗ 📜VerticalBlueLine.tsx
 ┃ ┣ 📂quiz
 ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┣ 📜CorrectAnswerBtn.tsx
 ┃ ┃ ┃ ┣ 📜CreateInfo.tsx
 ┃ ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┃ ┣ 📜HeaderTitle.tsx
 ┃ ┃ ┃ ┣ 📜mutations.ts
 ┃ ┃ ┃ ┣ 📜Options.tsx
 ┃ ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┃ ┣ 📜PageAndSubmitBtn.tsx
 ┃ ┃ ┃ ┗ 📜SideHeader.tsx
 ┃ ┃ ┣ 📂form
 ┃ ┃ ┃ ┣ 📂edit
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📜InputQuestionImg.tsx
 ┃ ┃ ┃ ┣ 📜InputQuestionTitle.tsx
 ┃ ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┃ ┣ 📜PlusQuestionBtn.tsx
 ┃ ┃ ┃ ┣ 📜QuestionForm.tsx
 ┃ ┃ ┃ ┣ 📜QuizForm.tsx
 ┃ ┃ ┃ ┣ 📜SelectQuestionType.tsx
 ┃ ┃ ┃ ┗ 📜UnloadImg.tsx
 ┃ ┃ ┣ 📂list
 ┃ ┃ ┃ ┣ 📜CreateNewQuizBtn.tsx
 ┃ ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┃ ┣ 📜QuizList.tsx
 ┃ ┃ ┃ ┗ 📜SelectQuizLevel.tsx
 ┃ ┃ ┗ 📜mutations.tsx
 ┃ ┣ 📂styles
 ┃ ┃ ┗ 📜font.ts
 ┃ ┣ 📂typing-game
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📜globals.css
 ┃ ┣ 📜layout.tsx
 ┃ ┣ 📜page.client.tsx
 ┃ ┣ 📜page.tsx
 ┃ ┗ 📜provider.tsx
 ┣ 📂assets
 ┣ 📂components
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📜BlueInput.tsx
 ┃ ┃ ┣ 📜DeleteButton.tsx
 ┃ ┃ ┣ 📜DropdownMenu.tsx
 ┃ ┃ ┣ 📜EditButton.tsx
 ┃ ┃ ┣ 📜ExitButton.tsx
 ┃ ┃ ┣ 📜FormButtons.tsx
 ┃ ┃ ┣ 📜LoadingImg.tsx
 ┃ ┃ ┣ 📜MobileHeader.tsx
 ┃ ┃ ┣ 📜PageUpBtn.tsx
 ┃ ┃ ┣ 📜PlusButton.tsx
 ┃ ┃ ┣ 📜RecommendLoginModal.tsx
 ┃ ┃ ┣ 📜ReportButton.tsx
 ┃ ┃ ┗ 📜SubHeader.tsx
 ┃ ┗ 📂layout
 ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┣ 📜MobileMenu.tsx
 ┃ ┃ ┣ 📜ProfileDropdown.tsx
 ┃ ┃ ┗ 📜ToggleLanguage.tsx
 ┃ ┗ 📂constant
 ┃ ┃ ┣ 📂locales
 ┃ ┃ ┃ ┣ 📂about
 ┃ ┃ ┃ ┃ ┗ 📜about.ts
 ┃ ┃ ┃ ┣ 📂admin
 ┃ ┃ ┃ ┃ ┣ 📜admin.ts
 ┃ ┃ ┃ ┃ ┗ 📜reports.ts
 ┃ ┃ ┃ ┣ 📂about
 ┃ ┃ ┃ ┃ ┣ 📜communityDetail.ts
 ┃ ┃ ┃ ┃ ┣ 📜communityList.ts
 ┃ ┃ ┃ ┃ ┗ 📜communityPost.ts
 ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┃ ┣ 📜header.ts
 ┃ ┃ ┃ ┃ ┗ 📜mobileMenu.ts
 ┃ ┃ ┃ ┣ 📂home
 ┃ ┃ ┃ ┃ ┣ 📜community-section.ts
 ┃ ┃ ┃ ┃ ┣ 📜footer.ts
 ┃ ┃ ┃ ┃ ┣ 📜news-section.ts
 ┃ ┃ ┃ ┃ ┣ 📜quiz-section.ts
 ┃ ┃ ┃ ┃ ┗ 📜ranking-section.ts
 ┃ ┃ ┃ ┣ 📂login
 ┃ ┃ ┃ ┃ ┣ 📜login.ts
 ┃ ┃ ┃ ┃ ┣ 📜privacypolicy.ts
 ┃ ┃ ┃ ┃ ┣ 📜qsignup.ts
 ┃ ┃ ┃ ┃ ┗ 📜terms.ts
 ┃ ┃ ┃ ┣ 📂my-page
 ┃ ┃ ┃ ┃ ┣ 📜my-activity.ts
 ┃ ┃ ┃ ┃ ┗ 📜my-profile.ts
 ┃ ┃ ┃ ┣ 📂quiz
 ┃ ┃ ┃ ┃ ┣ 📜quiz-editor.ts
 ┃ ┃ ┃ ┃ ┣ 📜quiz-list.ts
 ┃ ┃ ┃ ┃ ┗ 📜quiz-try.ts
 ┃ ┃ ┃ ┣ 📂typing-game
 ┃ ┃ ┃ ┃ ┗ 📜typing-game.ts
 ┃ ┃ ┣ 📜adminId.ts
 ┃ ┃ ┣ 📜PrivacyPolicy.tsx
 ┃ ┃ ┗ 📜Terms.tsx
 ┣ 📂hooks
 ┃ ┣ 📂queries
 ┃ ┃ ┣ 📜keys.constant.ts
 ┃ ┃ ┣ 📜useMutation.ts
 ┃ ┃ ┗ 📜useQuery.ts
 ┃ ┣ 📜useAuth.ts
 ┃ ┗ 📜useConfirmPageLeave.ts
 ┣ 📂store
 ┃ ┗ 📜store.ts
 ┣ 📂types
 ┃ ┣ 📜difficultySetting.ts
 ┃ ┣ 📜game.ts
 ┃ ┣ 📜langs.ts
 ┃ ┣ 📜manager.ts
 ┃ ┣ 📜pagination.ts
 ┃ ┣ 📜posts.ts
 ┃ ┣ 📜quizzes.ts
 ┃ ┣ 📜reports.ts
 ┃ ┣ 📜tailwind.ts
 ┃ ┣ 📜users.ts
 ┃ ┗ 📜word.ts
 ┣ 📂utill
 ┃ ┗ 📂supabase
 ┃ ┃ ┣ 📜client.ts
 ┃ ┃ ┣ 📜create-client.ts
 ┃ ┃ ┣ 📜middleware.ts
 ┃ ┃ ┣ 📜server.ts
 ┃ ┃ ┣ 📜storage.ts
 ┃ ┃ ┗ 📜supabase.ts
 ┃ ┣ 📜date.ts
 ┃ ┣ 📜generateFileName.ts
 ┃ ┣ 📜getRandomThumbnail.ts
 ┃ ┣ 📜handleMaxLength.ts
 ┃ ┣ 📜managerData.ts
 ┃ ┣ 📜useMultilingual.ts
 ┃ ┗ 📜wordList.ts


```
