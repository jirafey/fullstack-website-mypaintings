package com.example.model;

import java.util.Objects;
import com.example.model.ResponseOgolneDaneDostawyDaneDostawy;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * ResponseOgolneDaneDostawy
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-05-28T06:59:25.623324300+02:00[Europe/Warsaw]")


public class ResponseOgolneDaneDostawy   {
  @JsonProperty("message")
  private String message = null;

  @JsonProperty("dane_dostawy")
  private ResponseOgolneDaneDostawyDaneDostawy daneDostawy = null;

  public ResponseOgolneDaneDostawy message(String message) {
    this.message = message;
    return this;
  }

  /**
   * Get message
   * @return message
   **/
  @Schema(example = "Dane dostawy pobrane pomyślnie.", description = "")
  
    public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public ResponseOgolneDaneDostawy daneDostawy(ResponseOgolneDaneDostawyDaneDostawy daneDostawy) {
    this.daneDostawy = daneDostawy;
    return this;
  }

  /**
   * Get daneDostawy
   * @return daneDostawy
   **/
  @Schema(description = "")
  
    @Valid
    public ResponseOgolneDaneDostawyDaneDostawy getDaneDostawy() {
    return daneDostawy;
  }

  public void setDaneDostawy(ResponseOgolneDaneDostawyDaneDostawy daneDostawy) {
    this.daneDostawy = daneDostawy;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ResponseOgolneDaneDostawy responseOgolneDaneDostawy = (ResponseOgolneDaneDostawy) o;
    return Objects.equals(this.message, responseOgolneDaneDostawy.message) &&
        Objects.equals(this.daneDostawy, responseOgolneDaneDostawy.daneDostawy);
  }

  @Override
  public int hashCode() {
    return Objects.hash(message, daneDostawy);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ResponseOgolneDaneDostawy {\n");
    
    sb.append("    message: ").append(toIndentedString(message)).append("\n");
    sb.append("    daneDostawy: ").append(toIndentedString(daneDostawy)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}
