//
//  GrabItViewController.swift
//  hackathon
//
//  Created by Mohan Dhar on 6/6/15.
//  Copyright (c) 2015 Mohan Dhar. All rights reserved.
//

import UIKit

class GrabItViewController: UIViewController {

    @IBOutlet var whatDoYouNeedTextField: UITextField!
    @IBOutlet var itemDescriptionOutlet: UITextView!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

    @IBAction func submitButtonPressed(sender: UIButton) {
        
    }
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
