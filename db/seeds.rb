# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
[
  {
    title: "How to be a millionaire",
    content: "If I charge my student 1 dollar for every mistake made, I might be rich!",
    user_id: 1,

  },
  {
    title: "Buildings",
    content: "Why are buildings called buildings if they are already built?",
    user_id: 1,

  },
  {
    title: "Jeremiah's famous quote",
    content: "Generalisation is a form of specialisation",
    user_id: 1,

  },
  {
    title: "Naturalism",
    content: "Being natural is not a statement, it is the closest I can get to being myself",
    user_id: 2,

  },
  {
    title: "Tinder Musings",
    content: "I wish that Tinder has a scheduler so that I can manage my dates with all the girls",
    user_id: 2,

  },
  {
    title: "Extrovert",
    content: "I'm a real extrovert but when I am around someone new, I am super shy",
    user_id: 3,

  },
].each do |post|
  Post.create(post)
end

[
  {
    email:"shiado@email.com",
    username:"shiado",
    usertag: "I live in my head",
    password:"password1",
    password_confirmation:"password1",
    avatar_file_name:"shiado.jpg",
  },

  { email:"user2@email.com",
    username:"Hakim",
    usertag: "Swipe Right",
    password:"password2",
    password_confirmation:"password2",
    avatar_file_name:"user2.jpg",

  },

  {
    email:"user3@email.com",
    username:"Shyboy87",
    usertag: "I am shy",
    password:"password3",
    password_confirmation:"password3",
    avatar_file_name:"user3.jpg",
  },
].each do |user|
  User.create(user)
end
