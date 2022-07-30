export interface IBarkMsg {
  /**
   * The key for each device
   */
  device_key: string;

  /**
   * Notification title (font size would be larger than the body)
   */
  title: string;

  /**
   * Notification content
   */
  body?: string;

  /**
   * markdown
   */
  markdown?: string;

  /**
   * Reserved field, no use yet
   */
  category?: string;

  /**
   * Must be 1
   */
  automaticallyCopy?: 1;

  /**
   * The value to be copied
   *
   */
  copy?: string;

  /**
   * Url that will jump when click notification
   */
  url?: string;

  /**
   * Value must be 1. Whether or not should be archived by the app
   */
  isArchive?: 1;

  /**
   * The group of the notification
   */
  group?: number;

  /**
   * An url to the icon, available only on iOS 15 or later
   */
  icon?: string;

  /**
   * 铃声 https://github.com/Finb/Bark/tree/master/Sounds
   * copy(`'${Array.from(document.querySelectorAll('.Box-row.Box-row--focus-gray.py-2.js-navigation-item .js-navigation-open')).map(x=>x.innerText.replace('.caf','')).join(`'|'`)}'`)
   */
  sound?:
    | 'alarm'
    | 'anticipate'
    | 'bell'
    | 'birdsong'
    | 'bloom'
    | 'calypso'
    | 'chime'
    | 'choo'
    | 'descent'
    | 'electronic'
    | 'fanfare'
    | 'glass'
    | 'gotosleep'
    | 'healthnotification'
    | 'horn'
    | 'ladder'
    | 'mailsent'
    | 'minuet'
    | 'multiwayinvitation'
    | 'newmail'
    | 'newsflash'
    | 'noir'
    | 'paymentsuccess'
    | 'shake'
    | 'sherwoodforest'
    | 'silence'
    | 'spell'
    | 'suspense'
    | 'telegraph'
    | 'tiptoes'
    | 'typewriters'
    | 'update';

  /**
   * 时效性通知
   * active：不设置时的默认值，系统会立即亮屏显示通知。
   * timeSensitive：时效性通知，可在专注状态下显示通知。
   * passive：仅将通知添加到通知列表，不会亮屏提醒
   */
  level?: 'active' | 'timeSensitive' | 'passive';
}
