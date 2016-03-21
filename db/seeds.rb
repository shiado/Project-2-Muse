# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
[
  {
    title: "Post 1.1",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has ",
    user_id: 1,

  },
  {
    title: "Post 1.2",
    content: "Shiado2. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has ",
    user_id: 1,

  },
  {
    title: "Post 1.3",
    content: "Shiado3. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has ",
    user_id: 1,

  },
  {
    title: "Post 1.4",
    content: "Shiado4. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has ",
    user_id: 1,

  },
  {
    title: "Post 2",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has ",
    user_id: 2,

  },
  {
    title: "Post 3",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting",
    user_id: 3,

  },
].each do |post|
  Post.create(post)
end

[
  {
    email:"shiado@email.com",
    username:"shiado",
    password:"password1",
    password_confirmation:"password1",


  },
  { email:"user2@email.com",
    username:"user2",
    password:"password2",
    password_confirmation:"password2",

  },
  {
    email:"user3@email.com",
    username:"user3",
    password:"password3",
    password_confirmation:"password3",
  },
].each do |user|
  User.create(user)
end
