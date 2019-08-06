# Chat Space DB設計
***
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|

### Association
- has_many :groups, through: :members
- has_many :members
- has_many :messages
***
## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|title|string|null: false|

### Association
- has_many :users, through: :members
- has_many :members
- has_many :messages
***
## membersテーブル
|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
***
## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|string||
|image|string||
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
