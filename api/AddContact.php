<?php

	//
	//
	//
	//
	//
	$inData = getRequestInfo();

	$userid = $inData["userId"];
	$NewContact = $inData["contact"];

	
	$name = $NewContact["name"];
	$phone = $NewContact["phone"];
	$email = $NewContact["email"];

	$conn = new mysqli("localhost", "TheBeast4", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("INSERT into Contacts (Name, Phone, Email, UserID) VALUES(?,?,?,?)");
		$stmt->bind_param("sssi", $name, $phone, $email, $userid);
		$stmt->execute();
		$stmt->close();
		
		$last_id = $conn->insert_id;
		$stmt = $conn->prepare("SELECT ID, Name, Phone, Email FROM Contacts WHERE id=?");
		$stmt->bind_param("s", $last_id);
		$stmt->execute();
		$result = $stmt->get_result();
		
		if( $row = $result->fetch_assoc()  )
		{
			returnWithInfo( $row['Name'], $row['Phone'], $row['Email'], $row['ID'] );
		}
		else
		{
			returnWithError("Contact Creation Failed"); // Account not verified
		}
		$stmt->close();

		$conn->close();
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithInfo( $name, $phone, $email, $id )
	{
		$retValue = '{"id":' . $id . ',"name":"' . $name . '","phone":"' . $phone . '","email":"' . $email . '","error":"Contact Added"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
